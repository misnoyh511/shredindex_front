const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      '@babel/polyfill',
      './src/js/app.js',
    ],
    'css/style': './src/scss/style.scss',
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        // Only run `.js` and `.jsx` files through Babel
        test: /\.js?$/,
        // skip the files in the node_modules directory
        exclude: /node_modules/,
        // Options to configure the babel. here we have set up the preset.
        // this can be replaced with .babelrc file
        // presets: ['@babel/preset-env'],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
