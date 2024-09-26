const path = require('path');

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: 'webpack5',
      lazyCompilation: true,
      fsCache: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: "webpack5", // Storybook now defaults to Webpack 5, so ensure it's specified
  },
  async webpackFinal(config) {
    // Exclude SVGs from file-loader
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR loader for handling SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      issuer: /\.[jt]sx?$/,
    });

    return config;
  },
};

export default config;
