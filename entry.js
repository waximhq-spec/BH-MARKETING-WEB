/**
 * Hostinger Optimized Entry Point
 * 
 * This file wraps the Next.js standalone server to enforce resource limits
 * required for stable operation on Hostinger shared hosting environments.
 */

// Set production environment
process.env.NODE_ENV = 'production';

// Critical: Force single-threading before anything else
process.env.UV_THREADPOOL_SIZE = '1';
process.env.NEXT_TELEMETRY_DISABLED = '1';

console.log('--- Cinmach Productions: Stability Layer ---');

// Diagnostic Check: Verify local files
const fs = require('fs');
const path = require('path');
const rootFiles = fs.readdirSync(__dirname);
console.log('Directory contents:', rootFiles.join(', '));

if (!rootFiles.includes('.next')) {
  console.warn('WARNING: .next folder not found in root. Next.js standalone requires the .next folder to be in the same directory as the startup file.');
}

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
