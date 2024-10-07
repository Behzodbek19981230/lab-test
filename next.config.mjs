/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
