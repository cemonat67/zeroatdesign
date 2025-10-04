/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true, // static hosting için önerilir
  images: { unoptimized: true }, // CDN olmadan statik export için gerekli
};

export default nextConfig;
