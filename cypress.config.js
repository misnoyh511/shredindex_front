const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load custom plugins
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const customPlugins = require('./cypress/plugins/index.js')(on, config);

      // Setup code coverage
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);

      // Merge configurations
      return { ...config, ...customPlugins };
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
