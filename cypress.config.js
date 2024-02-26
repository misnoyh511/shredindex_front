const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line import/extensions,global-require
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:6006',
    testIsolation: false,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
