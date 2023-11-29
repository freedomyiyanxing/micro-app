const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require('./package.json');
const { shtEnv } = require('../../script/utils');
const { externals, cdn } = require('../../script/cdn');


module.exports = {
  externals,
  mode: 'development',
  stats: 'minimal',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // 更改配置文件时，重新缓存
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, './node_modules/.cac/webpack'),
  },
  devServer: {
    port: 6002,
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
        target: 'http://192.168.0.158:9000', // process.env.URL_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
        onProxyRes: function (proxyRes, req) {
          if (req.method === 'OPTIONS') {
            proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || '*'
            proxyRes.headers['Access-Control-Allow-Credentials'] = true
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,PUT,DELETE,FETCH'
            proxyRes.headers['Access-Control-Allow-Headers'] = 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Blade-Auth,source'
            proxyRes.statusCode = 204
          } else {
            proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || '*'
            proxyRes.headers['Access-Control-Allow-Credentials'] = true
          }
        }
      },
    }
  },
  entry: {
    main: path.resolve(__dirname, './src/main.js'),
  },
  target: ["web", "es2020"],
  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[name].[fullhash].js',
    pathinfo: false,
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.PUBLIC_PATH,
    //process.env.SHT_APP_TYPE === 'production' ? `https://oksht-mall.oss-cn-shenzhen.aliyuncs.com/cdn/${pkg.name}/` : '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    //   '@main': path.resolve(__dirname, '../packages/main/src'),
    //   '@account': path.resolve(__dirname, '../packages/account/src'),
    // },
    extensions: [
      '.js',
      '.vue',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src'),
        use: ['babel-loader']
      },
      {
        test:  /\.scss$/,
        include: path.resolve(__dirname, './src'),
        use: [
          MiniCssExtractPlugin.loader,
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
        // include: path.resolve(__dirname, './src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },

      {
        test: /.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        // include: path.resolve(__dirname, './src'),
        // generator: {
        //   filename: "fonts/[name]_[hash:6][ext]",
        // },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:16].css',
      chunkFilename: 'css/[name].[contenthash:16].css',
      ignoreOrder: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': shtEnv,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new WebpackBar({
      name: pkg.name,
    }),
    new HtmlWebpackPlugin({
      cdn,
      title: pkg.name,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      },
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ]
}
