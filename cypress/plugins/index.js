/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const browserify = require('@cypress/browserify-preprocessor');

module.exports = (on, config) => {
  // Code coverage plugin sends collected results
  // using its own cy.tasks calls
  // eslint-disable-next-line global-require
  require('@cypress/code-coverage/task')(on, config);

  // We tried using the cypress coverage Instrumentation approach
  // with @cypress/code-coverage/use-browserify-istanbul to avoid
  // conflicting with Jest (see https://github.com/cypress-io/code-coverage#alternative-for-unit-tests)
  // but had no luck, so let's use Browserify directly:

  // Tell cypress to use .bablerc when bundling spec code
  const options = browserify.defaultOptions;
  options.browserifyOptions.transform[1][1].babelrc = true; // @todo Find a nicer way to do this
  on('file:preprocessor', browserify(options));

  if (config.env.baseUrl !== undefined) {
    // eslint-disable-next-line no-param-reassign
    config.baseUrl = config.env.baseUrl;
  }

  return config;
};
