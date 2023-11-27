const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack-base');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[name].[fullhash].js'
  },
  stats: 'minimal',
  plugins: [
    new ESLintPlugin({
      cache: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // hot: true,
    port: process.env.PORT || 8888,
    historyApiFallback: true,
    // https://www.webpackjs.com/configuration/dev-server/#devserversetupexitsignals
    setupExitSignals: true,
    client: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: process.env.URL_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
});
