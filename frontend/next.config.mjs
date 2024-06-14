// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5196/api/:path*', // Substitua pela URL do seu backend em C#
      },
    ]
  },
}

export default nextConfig
