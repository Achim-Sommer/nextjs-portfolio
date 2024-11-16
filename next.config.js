/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  },
}

module.exports = nextConfig
