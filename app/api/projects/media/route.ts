import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fileId = searchParams.get('id');
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!fileId) {
    return new Response('File ID is required', { status: 400 });
  }

  // If there's no API key or if the ID is a mock ID, redirect to a mock video/image
  if (!apiKey || fileId.startsWith('mock-') || fileId.includes('mixkit')) {
    // If it's a mock url, redirect to it
    if (fileId.startsWith('http')) {
      return Response.redirect(fileId);
    }
    // Fallback video for Golf mock
    return Response.redirect('https://assets.mixkit.co/videos/preview/mixkit-golf-player-hitting-a-ball-on-the-green-41904-large.mp4');
  }

  const rangeHeader = request.headers.get('range');

  try {
    const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    
    const headers: Record<string, string> = {};
    if (rangeHeader) {
      headers['Range'] = rangeHeader;
    }

    const driveRes = await fetch(driveUrl, { headers });

    if (!driveRes.ok) {
      // Fallback to standard web download redirect if API request fails
      return Response.redirect(`https://drive.google.com/uc?export=download&id=${fileId}`);
    }

    const responseHeaders = new Headers();
    const contentType = driveRes.headers.get('content-type') || 'video/mp4';
    const contentRange = driveRes.headers.get('content-range');
    const contentLength = driveRes.headers.get('content-length');

    responseHeaders.set('Content-Type', contentType);
    if (contentRange) responseHeaders.set('Content-Range', contentRange);
    if (contentLength) responseHeaders.set('Content-Length', contentLength);
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(driveRes.body, {
      status: driveRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('[API Media] Error streaming from Google Drive:', error);
    return Response.redirect(`https://drive.google.com/uc?export=download&id=${fileId}`);
  }
}
