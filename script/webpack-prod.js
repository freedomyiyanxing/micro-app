const path = require('node:path');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { UNIT } = require('./utils');
const baseConfig = require('./webpack-base');
const pkg = require('../package.json');

const plugins = [];


// 测试环境 需要压缩 gzip 生产环境使用 阿里云oss 自带cdn 就不需要压缩 gzip了
if (process.env.SHT_APP_TYPE === 'test') {
  plugins.push(
    new CompressionPlugin({
      test: /\.js$/, // 需要压缩的文件类型
      threshold: 15 * UNIT, // 归档需要进行压缩的文件大小最小值，10K以上的进行压缩
    }),
  )
}

const config = merge(baseConfig, {
  mode: 'production',
  // devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash:16].js',
    chunkFilename: 'js/[name].[contenthash:16].js'
  },
  infrastructureLogging: {
    colors: true,
    level: 'log',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    ...plugins,
  ],
});

module.exports = config;
