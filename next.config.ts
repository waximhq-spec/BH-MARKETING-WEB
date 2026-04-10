import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable exhaustive checks to save memory/processes on Hostinger
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Set output to standalone for lightweight production builds
  output: 'standalone',

  // Disable powered by header to save small overhead
  poweredByHeader: false,
  
  // Disable compression as Hostinger's LiteSpeed server handles this more efficiently
  compress: false,

  // Disable image optimization to avoid spawning heavy 'sharp' processes
  images: { unoptimized: true },
  
  // Disable memory-heavy features to prevent Hostinger thread limit crashes
  swcMinify: false,
  optimizeFonts: false,

  // Hard limit Next.js to use only 1 CPU core and disable worker threads
  experimental: {
    cpus: 1,
    workerThreads: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
