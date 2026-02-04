import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bunyodoptom.uz",
        port: "",
        pathname: "/**", // barcha pathlarni qamrab oladi
      },
    ],
  },
  allowedDevOrigins: [
    "http://192.168.0.105:3000", // sizning lokal IP + port
    "http://localhost:3000", // lokalhost
  ],
};

export default nextConfig;
