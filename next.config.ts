import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bunyodoptom.uz",
        port: "",
        pathname: "/**", // barcha pathlarni qamrab oladi
      },
    ],
  },
};

export default nextConfig;
