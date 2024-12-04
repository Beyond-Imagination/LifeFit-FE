import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // 포트 번호를 명시합니다.
        pathname: '/uploads/**', // 경로를 구체적으로 설정합니다.
      },
    ],
  },
};

export default nextConfig;
