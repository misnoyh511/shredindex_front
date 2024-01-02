module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-class-static-block',
  ],
  env: {
    test: {
      plugins: [],
    },
    e2e: {
      plugins: [
        'istanbul',
      ],
    },
  },
};
