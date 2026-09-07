/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/FlowPilot-AI",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
