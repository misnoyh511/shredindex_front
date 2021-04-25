const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const dotenv = require('dotenv');

const development = 'development';

const env = dotenv.config().parsed;

let envKeys = {};

if (env) {
  envKeys = Object.keys(env)
    .reduce((prev, next) => {
      // eslint-disable-next-line no-param-reassign
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
}

module.exports = {
  mode: development,
  entry: {
    'dist/js/app': [
      '@babel/polyfill',
      './src/js/app.js',
    ],
    'dist/css/style': './src/scss/style.scss',
  },
  devServer: {
    contentBase: './public',
    open: true,
    port: 3000,
    overlay: true,
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist/images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
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
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'Shred Index',
      template: 'src/index.html',
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
