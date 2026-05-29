/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/thazio-labs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
