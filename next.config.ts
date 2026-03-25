import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.bunyodoptom.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bunyodoptom.uz",
      },
    ],
  },
};

export default nextConfig;
