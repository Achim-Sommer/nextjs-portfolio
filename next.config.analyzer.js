const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
