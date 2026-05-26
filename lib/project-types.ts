export interface ProjectMedia {
  type: 'photo' | 'video';
  url: string;
  name: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  tags: string[];
  media: ProjectMedia[];
  hasPhotos: boolean;
  hasVideos: boolean;
}

// Fallback items representing the current premium work (plus the requested Golf project)
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'mock-golf',
    slug: 'golf',
    title: 'The Royal Golf Club',
    category: 'Sports & Leisure',
    year: '2024',
    description: 'A cinematic tour of Bahrain\'s premier championship golf course. Captured during the golden hour to highlight the manicured greens, water hazards, and luxury clubhouse architecture.',
    thumbnail: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop',
    tags: ['Drone', 'Twilight', 'Cinematic', '4K'],
    media: [
      {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-golf-player-hitting-a-ball-on-the-green-41904-large.mp4',
        name: 'golf-swing.mp4'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop',
        name: 'green-18.jpg'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop',
        name: 'clubhouse.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: true
  },
  {
    id: 'mock-dilmunia',
    slug: 'dilmunia-waterfront',
    title: 'Dilmunia Waterfront Residences',
    category: 'Real Estate',
    year: '2024',
    description: 'A cinematic study of luxury coastal living. We captured the Dilmunia Waterfront Residences from dawn to dusk — drone sweeps over the sea, intimate interior moments, and the golden hour light that makes this project unlike any other.',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    tags: ['Drone', 'HDR', 'Interior', '4K'],
    media: [
      {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-design-39912-large.mp4',
        name: 'dilmunia-tour.mp4'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=75',
        name: 'exterior-dusk.jpg'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=75',
        name: 'lobby.jpg'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=75',
        name: 'penthouse-view.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: true
  },
  {
    id: 'mock-palm-villa',
    slug: 'palm-villa-al-areen',
    title: 'The Palm Villa — Al Areen',
    category: 'Real Estate',
    year: '2024',
    description: 'Twilight cinematics for an ultra-luxury villa in Al Areen. Every shot captures the interplay between architecture and desert light.',
    thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    tags: ['Aerial', 'Twilight', '4K'],
    media: [
      {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-large-pool-in-a-luxury-hotel-at-sunset-41484-large.mp4',
        name: 'villa-twilight.mp4'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=75',
        name: 'poolside.jpg'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=75',
        name: 'facade.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: true
  },
  {
    id: 'mock-seef-tower',
    slug: 'seef-district-tower',
    title: 'Seef District Tower',
    category: 'Real Estate',
    year: '2023',
    description: 'City-living redefined. A slow-motion study of one of Bahrain\'s most prominent commercial towers.',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    tags: ['Interior', 'Slow Motion'],
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=75',
        name: 'atrium.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: false
  },
  {
    id: 'mock-khaleej-co',
    slug: 'khaleej-co',
    title: 'Khaleej & Co.',
    category: 'F&B',
    year: '2024',
    description: 'A brand film for Bahrain\'s most iconic café chain. We brought the warmth of Khaleeji culture into motion — rich textures, steam rising, intimate moments over coffee.',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    tags: ['Food Motion', 'Brand Film', 'Editorial'],
    media: [
      {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-coffee-into-a-cup-43187-large.mp4',
        name: 'coffee-pour.mp4'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=75',
        name: 'latte-art.jpg'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=75',
        name: 'brunch.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: true
  },
  {
    id: 'mock-flame-salt',
    slug: 'flame-and-salt',
    title: 'Flame & Salt',
    category: 'F&B',
    year: '2023',
    description: 'Colour-graded food cinematics built around texture, heat, and appetite. Shot in slow motion to let every drop and char read on screen.',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    tags: ['Texture', 'Colour Graded'],
    media: [
      {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-flambeed-dish-in-a-professional-kitchen-40763-large.mp4',
        name: 'chef-cooking-flambe.mp4'
      },
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=75',
        name: 'steak-grill.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: true
  },
  {
    id: 'mock-zafran-house',
    slug: 'zafran-house',
    title: 'Zafran House',
    category: 'F&B',
    year: '2023',
    description: 'A full identity rollout — from brand film to motion graphics for social. Zafran House is a modern take on the traditional Khaleeji dining experience.',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80',
    tags: ['Identity', 'Motion'],
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=75',
        name: 'interior-tables.jpg'
      }
    ],
    hasPhotos: true,
    hasVideos: false
  }
];
