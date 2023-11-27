const path = require('node:path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { shtEnv } = require('./utils');
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
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
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
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: [
      '.js',
      '.vue',
    ],
  },
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
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin(
      {
        title: pkg.name,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        template: path.resolve(__dirname, '../public/index.html'),
      }
    ),
  ],
}
