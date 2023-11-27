const fs = require('node:fs');
const path = require('node:path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
require('./sht-env');
const UNIT = 1024;

function generateCacheGroups(fileName) {
  const name = `src-${fileName}`;
  return {
    [name]: {
      name,
      enforce: true,
      chunks: 'all',
      priority: 10,
      test: RegExp(`[\\\\/]src[\\\\/](${fileName})[\\\\/]`),
    },
  }
}

function generateViewsCacheGroups(f) {
  const objs = Object.create(null);
  // 过滤掉 home 和 account
  const fileNames = f.filter((item) => !['account'].includes(item))

  fileNames.forEach((fileName) => {
    const res = fs.readdirSync(path.join(__dirname, `../src/views/${fileName}`));
    res.forEach((name) => {
      const key = `${fileName}-${name}`;
      objs[key] = {
        name: key,
        enforce: true,
        chunks: 'async',
        test: RegExp(`[\\\\/]src[\\\\/]views[\\\\/]${fileName}[\\\\/]${name}[\\\\/]`),
      }
    });
  })
  return objs;
}

function generatePageCacheGroups(fileNames, chunks = 'async') {
  const objs = Object.create(null);
  fileNames.forEach((fileName) => {
    const key = `page-${fileName}`;
    objs[key] = {
      name: key,
      enforce: true,
      chunks,
      test: RegExp(`[\\\\/]src[\\\\/]page[\\\\/]${fileName}[\\\\/]`),
    }
  })
  return objs;
}

const isDev = process.env.SHT_APP_TYPE === 'development';

const optimization = () => {
  return {
    optimization: {
      moduleIds: 'deterministic',
      minimize: !isDev,
      minimizer: isDev ? [] : [
        '...',
        new CssMinimizerPlugin(),
      ],
      // https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
      runtimeChunk: isDev ? {
        name: 'runtime',
      } : false,
      removeAvailableModules: !isDev,
      removeEmptyChunks: !isDev,
      splitChunks: isDev ? false : {
        chunks: 'async',
        minSize: UNIT, // 大于2kb 使用 自定义拆分
        // https://www.webpackjs.com/plugins/split-chunks-plugin#splitchunkscachegroupscachegroupreuseexistingchunk
        cacheGroups: {
          default: false,
          defaultVendors: {
            name: 'sht-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            chunks: 'all',
            reuseExistingChunk: true,
          },
          ...generateCacheGroups('api'),
          ...generateCacheGroups('store'),
          // ...generateCacheGroups('router'),
          ...generateCacheGroups('common'),
          ...generateCacheGroups('util'),
          ...generateCacheGroups('config'),
          ...generateViewsCacheGroups(fs.readdirSync(path.join(__dirname, '../src/views'))),
          ...generatePageCacheGroups(fs.readdirSync(path.join(__dirname, '../src/page')), 'all'),
        },
      }
    }
  };
}

// 生成页面的 环境变量
const shtEnv = Object.keys(process.env).reduce((env, key) => {
  if (key.startsWith('SHT_')) {
    env[key] = JSON.stringify(process.env[key])
  }
  return env
}, Object.create(null));

module.exports = {
  UNIT,
  optimization,
  shtEnv,
}
