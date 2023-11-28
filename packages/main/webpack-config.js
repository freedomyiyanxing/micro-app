const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const pkg = require('./package.json');
const { shtEnv } = require('../../script/utils');


module.exports = {
  mode: 'development',
  stats: 'minimal',
  devServer: {
    // hot: true,
    port: process.env.PORT || 6001,
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
        test: /\.scss$/,
        include: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ],
  },
  plugins: [
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
        template: path.resolve(__dirname, './public/index.html'),
      }
    ),
  ]
}
