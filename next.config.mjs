/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'backend.planandbooktrip.com'],  // Add your allowed domains here
  },
}
  export default  nextConfig;