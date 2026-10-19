/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: false },
  // The icon set holds thousands of icons in one file; this makes the build load only the ones the site uses, which keeps the
  // build small enough for the server's memory.
  experimental: { optimizePackageImports: ['@hugeicons/core-free-icons', '@hugeicons/react'] },
}

export default nextConfig
