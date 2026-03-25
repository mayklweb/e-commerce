import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.bunyodoptom.uz' }
    ]
  }
};

export default nextConfig;