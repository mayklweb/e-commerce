import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["api.bunyodoptom.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bunyodoptom.uz",
      },
    ], // Add your external host here
  },
};

export default nextConfig;
