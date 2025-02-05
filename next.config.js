/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: '/tracking/:path*',
        destination: 'http://localhost:5177/:path*',
      },
    ];
  },
}

export default nextConfig 