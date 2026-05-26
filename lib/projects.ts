import fs from 'fs';
import path from 'path';
import { Project, ProjectMedia, FALLBACK_PROJECTS } from './project-types';

export type { Project, ProjectMedia };

const CACHE_PATH = path.join(process.cwd(), '.projects-cache.json');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheStructure {
  timestamp: number;
  projects: Project[];
}

let memoryCache: CacheStructure | null = null;

// Optimize Cloudinary URLs with dynamic format and quality conversion
function optimizeCloudinaryUrl(url: string, resourceType: string): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    if (resourceType === 'image') {
      return url.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
    }
    if (resourceType === 'video') {
      return url.replace('/video/upload/', '/video/upload/f_auto,q_auto/');
    }
  }
  return url;
}

// Generate highly optimized responsive thumbnails for card listings
function optimizeThumbnailUrl(url: string): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    return url.replace('/image/upload/', '/image/upload/c_fill,g_auto,w_800,h_600,f_auto,q_auto/');
  }
  return url;
}

export async function getProjects(): Promise<Project[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dcix09g5l';
  const apiKey = process.env.CLOUDINARY_API_KEY || '388199725355486';
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const configuredFolder = process.env.CLOUDINARY_FOLDER;

  if (!apiSecret) {
    console.warn('[Projects Service] CLOUDINARY_API_SECRET is not configured. Serving fallback projects.');
    return FALLBACK_PROJECTS;
  }

  const now = Date.now();

  // Check in-memory cache first
  if (memoryCache && (now - memoryCache.timestamp < CACHE_TTL_MS)) {
    console.log('[Projects Service] Serving projects from memory cache.');
    return memoryCache.projects;
  }

  // Check filesystem cache next
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as CacheStructure;
      if (now - cacheData.timestamp < CACHE_TTL_MS) {
        console.log('[Projects Service] Serving projects from filesystem cache.');
        memoryCache = cacheData;
        return cacheData.projects;
      }
    }
  } catch (err) {
    console.warn('[Projects Service] Failed to read filesystem cache:', err);
  }

  console.log('[Projects Service] Cache expired or missing. Fetching from Cloudinary...');
  try {
    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

    const expression = configuredFolder
      ? `folder:${configuredFolder} OR folder:${configuredFolder}/*`
      : `folder:GOLF OR folder:GOLF/* OR folder:cinmach OR folder:cinmach/*`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify({
        expression,
        max_results: 500,
        sort_by: [{ public_id: "asc" }]
      }),
      next: { revalidate: 300 } // Next.js level revalidation cache
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('[Projects Service] Cloudinary Search API error:', data.error?.message || response.statusText);
      return FALLBACK_PROJECTS;
    }

    const resources = data.resources || [];
    const projectMap = new Map<string, Project>();

    for (const res of resources) {
      if (!res.folder) continue;

      const folderParts = res.folder.split('/').filter(Boolean);
      if (folderParts.length === 0) continue;

      // Grouping logic:
      // If folder is nested under 'cinmach', e.g. 'cinmach/GOLF' or 'cinmach/GOLF/photos', project is 'GOLF'.
      // Otherwise, the first part of the folder path is the project ID (e.g. 'GOLF').
      let projectId = '';
      if (folderParts[0].toLowerCase() === 'cinmach') {
        if (folderParts.length < 2) continue; // Skip files directly in root cinmach/
        projectId = folderParts[1];
      } else {
        projectId = folderParts[0];
      }

      if (!projectId) continue;

      let project = projectMap.get(projectId);
      if (!project) {
        const title = projectId
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase());

        project = {
          id: projectId,
          slug: projectId.toLowerCase(),
          title: title,
          category: 'Production',
          year: new Date().getFullYear().toString(),
          description: 'A cinematic showcase of visual storytelling.',
          thumbnail: '',
          tags: ['Cinematic', 'Production'],
          media: [],
          hasPhotos: false,
          hasVideos: false
        };
        projectMap.set(projectId, project);
      }

      // Check if this resource is a metadata info.json raw file
      if (res.resource_type === 'raw' && res.filename === 'info' && res.format === 'json') {
        try {
          const infoRes = await fetch(res.secure_url);
          if (infoRes.ok) {
            const info = await infoRes.json();
            if (info.title) project.title = info.title;
            if (info.category) project.category = info.category;
            if (info.year) project.year = info.year;
            if (info.description) project.description = info.description;
            if (info.tags) project.tags = info.tags;
          }
        } catch (e) {
          console.error(`[Projects Service] Failed to fetch info.json content for ${projectId}:`, e);
        }
        continue;
      }

      const isVideo = res.resource_type === 'video';
      const isImage = res.resource_type === 'image';

      if (!isImage && !isVideo) continue;

      const mediaUrl = optimizeCloudinaryUrl(res.secure_url, res.resource_type);
      const isCover = res.filename.toLowerCase() === 'cover';

      if (isCover && isImage) {
        project.thumbnail = optimizeThumbnailUrl(res.secure_url);
      } else {
        project.media.push({
          type: isVideo ? 'video' : 'photo',
          url: mediaUrl,
          name: res.filename + (res.format ? `.${res.format}` : '')
        });
        if (isVideo) project.hasVideos = true;
        if (isImage) project.hasPhotos = true;
      }
    }

    // Convert map to array and fill missing thumbnails or media properties
    const projects = Array.from(projectMap.values());
    for (const project of projects) {
      if (!project.thumbnail) {
        const firstImage = project.media.find(m => m.type === 'photo');
        if (firstImage) {
          project.thumbnail = optimizeThumbnailUrl(firstImage.url);
        } else {
          const firstVideo = project.media.find(m => m.type === 'video');
          if (firstVideo) {
            // Generate image thumbnail frame from video path natively
            const videoThumb = firstVideo.url
              .replace('/video/upload/', '/video/upload/c_fill,g_auto,w_800,h_600,f_auto,q_auto/')
              .replace(/\.[^/.]+$/, '.jpg');
            project.thumbnail = videoThumb;
          } else {
            project.thumbnail = '/placeholder.jpg';
          }
        }
      }
    }

    // Update caches
    const newCache: CacheStructure = { timestamp: now, projects };
    memoryCache = newCache;
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(newCache, null, 2), 'utf8');
    } catch (err) {
      console.warn('[Projects Service] Failed to write cache to file:', err);
    }

    return projects;
  } catch (err) {
    console.error('[Projects Service] Error fetching from Cloudinary, falling back:', err);
    return FALLBACK_PROJECTS;
  }
}
