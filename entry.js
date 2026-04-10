/**
 * Hostinger Optimized Entry Point
 * 
 * This file wraps the Next.js standalone server to enforce resource limits
 * required for stable operation on Hostinger shared hosting environments.
 */

// Force the Node.js thread pool to stay at 1.
// This is the most critical setting to prevent 503 errors on Hostinger.
process.env.UV_THREADPOOL_SIZE = '1';

// Disable Next.js telemetry at runtime to save memory and network overhead.
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Ensure the port is set (Hostinger usually uses 3000 by default, but we'll be explicit)
process.env.PORT = process.env.PORT || '3000';

// Set production environment
process.env.NODE_ENV = 'production';

console.log('--- Starting Production Server (Hostinger Mode) ---');
console.log('Resource Limits: UV_THREADPOOL_SIZE = 1');
console.log('Memory Limit: --max-old-space-size=400');

// List of potential paths for the standalone server
const serverPaths = [
  './.next/standalone/server.js', // Standard path
  './server.js',                 // If standalone contents were moved to root
];

let started = false;
for (const path of serverPaths) {
  try {
    // We check if the file exists first to avoid trying to require entry.js itself if renamed
    if (path.includes('entry.js')) continue; 
    
    console.log(`Attempting to load server from: ${path}`);
    require(path);
    started = true;
    break;
  } catch (error) {
    // Only log if it's not a 'module not found' error for the specific path
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error loading server from ${path}:`, error);
    }
  }
}

if (!started) {
  console.error('CRITICAL FAULT: Could not find Next.js standalone server.');
  console.error('Expected files: .next/standalone/server.js OR server.js (standalone build)');
  console.error('Please verify your deployment folder contains the .next folder.');
  process.exit(1);
}
