const webpack = require('webpack');
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // hot: true,
    port: process.env.PORT || 8002,
    historyApiFallback: true,
    // https://www.webpackjs.com/configuration/dev-server/#devserversetupexitsignals
    setupExitSignals: true,
    client: {
      overlay: false,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
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
