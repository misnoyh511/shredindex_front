const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'node_modules')],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // TODO: remove eventually.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { dev, isServer }) {
    config.resolve.alias['@coreui/coreui'] = path.join(__dirname, 'node_modules', '@coreui/coreui');

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });

    // Add Istanbul babel plugin for code coverage
    if (!isServer && !dev) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['istanbul'],
            },
          },
        ],
        exclude: [/node_modules/, /\.next/],
      });
    }

    return config;
  },
  images: {
    disableStaticImages: false,  // Next.js Image component updates
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ftjcfx.com',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  experimental: {
    appDir: true,  // Optional: Next.js 14 app directory structure
    typedRoutes: true,  // New experimental feature in Next.js 14 for typed routes in TypeScript
  },
};

module.exports = nextConfig;
