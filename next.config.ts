import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable exhaustive checks to save memory/processes on Hostinger
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Hard limit Next.js to use only 1 CPU core during build
  // This prevents it from instantly spawning 7+ worker processes and hitting Hostinger's 400 process cap.
  experimental: {
    cpus: 1,
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
