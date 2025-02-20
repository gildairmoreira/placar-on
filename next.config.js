/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.api-sports.io', 'media-4.api-sports.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.api-sports.io',
      },
    ],
  },
}

module.exports = nextConfig 