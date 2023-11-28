/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/28
 * @project micro-app
 *
 * */
const path = require('node:path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimization, UNIT, shtEnv } = require('./utils');
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

const base = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // 更改配置文件时，重新缓存
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '../node_modules/.cac/webpack'),
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

  plugins: {
    MiniCssExtractPlugin: new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:16].css',
      chunkFilename: 'css/[name].[contenthash:16].css',
      ignoreOrder: true,
    }),
    VueLoaderPlugin: new VueLoaderPlugin(),
    DefinePlugin: new webpack.DefinePlugin({ 'process.env': shtEnv }),
    WebpackBar: new WebpackBar({ name: pkg.name }),
  },

  module: {
    vue: {
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
        // {
        //   loader: 'sht-vue-components-name',
        //   options: {
        //     separator: pkg.name,
        //   }
        // },
      ]
    },
    js: {
      test: /\.js$/,
      include: path.resolve(__dirname, '../src'),
      use: ['babel-loader']
    },
    scss: {
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
    css: {
      test: /\.css$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        process.env.SHT_APP_TYPE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }
  }
}

module.exports = base;
