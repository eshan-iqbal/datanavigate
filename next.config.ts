import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "gaspingly-untrembling-meghann.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "localhost:3000",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;


