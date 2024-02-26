
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor');
const webpackConfig = require('../../webpack.config');

module.exports = (on, config) => {
  if (process.env.NODE_ENV === 'e2e') {
    // eslint-disable-next-line global-require
    require('@cypress/code-coverage/task')(on, config);

    const options = {
      webpackOptions: webpackConfig,
      watchOptions: {},
    };

    on('file:preprocessor', webpack(options));
  }

  if (config.env.baseUrl !== undefined) {
    // eslint-disable-next-line no-param-reassign
    config.baseUrl = config.env.baseUrl;
  }

  return config;
};
