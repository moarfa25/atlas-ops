import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    typedRoutes: true,
  },
  // Proxy /api to the backend in dev.
  async rewrites() {
    return [
      {
        source: "/api/ops/:path*",
        destination: `${process.env.ATLAS_API_URL ?? "http://localhost:8000"}/ops/:path*`,
      },
    ];
  },
};

export default config;
