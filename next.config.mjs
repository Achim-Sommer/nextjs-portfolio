import crypto from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Serwist precacht ohne Zutun alles aus public/ - hier waeren das 8 MB,
// vor allem die grossen PNGs unter img/ und die Inter-TTFs, die
// ausschliesslich die OG-Route braucht. Deshalb die Liste von Hand:
// nur was die installierte PWA sofort braucht. Alles andere landet ueber
// defaultCache zur Laufzeit im Cache, wenn es angefragt wird.
//
// Achtung: additionalPrecacheEntries ERSETZT den public-Glob, es ergaenzt
// ihn nicht. Was hier nicht steht, wird nicht vorgecacht.
const publicPrecacheFiles = [
  'favicon.ico',
  'apple-touch-icon.png',
  'logo.png',
  'manifest.json',
  ...readdirSync(new URL('./public/icons', import.meta.url)).map((file) => `icons/${file}`),
];

const fileRevision = (relativePath) =>
  crypto
    .createHash('sha256')
    .update(readFileSync(new URL(`./public/${relativePath}`, import.meta.url)))
    .digest('hex')
    .slice(0, 16);

const precacheEntries = [
  // next-pwa hat die Offline-Seite vorgecacht, Serwist tut das nicht von
  // selbst. Ohne diesen Eintrag greift der document-Fallback nur, wenn
  // /offline vorher schon einmal besucht wurde - also praktisch nie.
  // Die Revision wechselt pro Build, damit ein Deploy die Seite erneuert.
  { url: '/offline', revision: crypto.randomUUID() },
  ...publicPrecacheFiles.map((file) => ({ url: `/${file}`, revision: fileRevision(file) })),
];

// Loest next-pwa ab. Die Caching-Strategien stehen jetzt in app/sw.ts,
// nicht mehr hier - Serwist bringt sie als defaultCache mit.
const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  reloadOnOnline: true,
  additionalPrecacheEntries: precacheEntries,
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
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@tabler/icons-react',
      'react-icons',
      'react-syntax-highlighter',
    ],
    optimisticClientCache: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 60000,
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
            lib: {
              test(module) {
                return module.size() > 80000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = crypto.createHash('sha1');
                if (module.identifier) {
                  hash.update(module.identifier());
                }
                return `lib-${hash.digest('hex').substring(0, 8)}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            }
          },
        },
      };

      config.optimization.minimizer.push(
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                minifyFontValues: true,
                minifyGradients: true,
              },
            ],
          },
        })
      );
    }

    return config;
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Nur in Produktion: dort tragen die Dateien einen Inhalts-Hash im Namen,
      // "immutable" ist also korrekt. Im Dev-Modus sind die Chunk-Namen stabil
      // (z. B. _app-pages-browser_src_components_Navbar_tsx.js) — mit diesem
      // Header würde der Browser sie ein Jahr lang cachen und Codeänderungen
      // erst nach einem Hard Reload anzeigen.
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/_next/static/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
                },
              ],
            },
          ]
        : []),
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store',
          },
        ],
      },
      {
        source: '/_next/static/chunks/:path*.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/apache2-php-7-4-mariadb-und-phpmyadmin-auf-linux-server-installieren-mysql-datenbank-erstellen',
        destination: '/debian-lamp-stack',
        permanent: true,
      },
      {
        source: '/mount-zonah-medical-center-mlo-fivem',
        destination: '/fivem-template-server',
        permanent: true,
      },
      {
        source: '/fivem-esx-scoreboard',
        destination: '/fivem-template-server',
        permanent: true,
      },
    ]
  },
};
export default withBundleAnalyzer(withSerwist(nextConfig));
