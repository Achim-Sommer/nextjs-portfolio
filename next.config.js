const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/Achim-Sommer/github-readme-stats/master/**',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Optimiere die Cache-Strategie
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage
      compression: 'gzip',
      store: 'pack',
      version: '1.0.0'
    };

    // Optimiere die Bundle-Größe
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        mergeDuplicateChunks: true,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Exportiere die Konfiguration mit Bundle Analyzer und PWA
module.exports = withBundleAnalyzer(withPWA(nextConfig));
