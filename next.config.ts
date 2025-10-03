import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", //static export
  images: {
    unoptimized: true, //для статического экспорта нужно отключить оптимизацию изображений
  }
};

export default nextConfig;
