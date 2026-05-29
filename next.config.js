/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/thazio-labs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
