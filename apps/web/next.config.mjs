/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/db", "@workspace/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
}

export default nextConfig
