import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable exhaustive checks to save memory/processes on Hostinger
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Set output to standalone for lightweight production builds
  output: 'standalone',

  // Disable SWC minification if it spawns too many Rust threads
  // swcMinify: false, 

  // Hard limit Next.js to use only 1 CPU core and disable worker threads
  // This prevents it from instantly spawning 7+ worker processes/threads and hitting Hostinger's 120 process cap.
  experimental: {
    cpus: 1,
    workerThreads: false,
    memoryBasedWorkersCount: true,
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
