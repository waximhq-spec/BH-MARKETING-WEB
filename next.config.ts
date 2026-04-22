import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set output to standalone for lightweight production builds
  output: 'standalone',

  // Disable powered by header to save small overhead
  poweredByHeader: false,
  
  // Disable compression as Hostinger's LiteSpeed server handles this more efficiently
  compress: false,

  // Disable image optimization to avoid spawning heavy 'sharp' processes
  images: { unoptimized: true },
  
  // Disable memory-heavy features to prevent Hostinger thread limit crashes
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
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "font-src 'self' data:;",
              "frame-src 'self' https://challenges.cloudflare.com;",
              "connect-src 'self' https://challenges.cloudflare.com;",
              "worker-src 'self' blob:;",
              "object-src 'none';",
              "upgrade-insecure-requests;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
