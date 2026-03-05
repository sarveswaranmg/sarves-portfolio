import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  eslint: {
    // ESLint is run separately via `npm run lint` (matching original Vite workflow)
    ignoreDuringBuilds: true,
  },
  // Pure Static Site Generation (SSG) - no server rendering
  staticPageGenerationTimeout: 60,
  images: {
    disableStaticImages: true,
    // Optimize images on build
    formats: ["image/avif", "image/webp"],
    // Cache images for 1 year (immutable)
    minimumCacheTTL: 31536000,
  },
  // Optimize bundle
  compress: true,
  // Headers for caching static assets
  async headers() {
    return [
      {
        source: "/(_next/static|public)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, must-revalidate",
          },
        ],
      },
    ];
  },
  webpack(config) {
    // Return URL strings for image/SVG imports (like Vite does)
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
