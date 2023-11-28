const path = require('node:path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimization, UNIT, shtEnv } = require('./utils');
const { externals, cdn } = require('./cdn');
const pkg = require('../package.json');

const plugins = [];

if (process.env.SHT_APP_TYPE !== 'development') {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:16].css',
      chunkFilename: 'css/[name].[contenthash:16].css',
      ignoreOrder: true,
    })
  )
}

module.exports = {
  // ...optimization(),
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     // 更改配置文件时，重新缓存
  //     config: [__filename],
  //   },
  //   cacheDirectory: path.resolve(__dirname, '../node_modules/.cac/webpack'),
  // },
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  target: ["web", "es2020"],
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    publicPath: process.env.PUBLIC_PATH,
    //process.env.SHT_APP_TYPE === 'production' ? `https://oksht-mall.oss-cn-shenzhen.aliyuncs.com/cdn/${pkg.name}/` : '/',
  },
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, '../packages/main/src'),
      '@account': path.resolve(__dirname, '../packages/account/src'),
    },
    extensions: [
      '.js',
      '.vue',
    ],
  },
  performance: {
    maxAssetSize: 500 * UNIT, // 500kb
    maxEntrypointSize: 1000 * UNIT, // 1MB
  },
  // externals,
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
            }
          },
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          process.env.SHT_APP_TYPE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          process.env.SHT_APP_TYPE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
    ],
  },
  plugins: [
    ...plugins,
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': shtEnv,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new WebpackBar({
      name: pkg.name,
    }),
  ]
}
