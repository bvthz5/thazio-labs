/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/thazio-labs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
