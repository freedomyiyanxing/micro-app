require('./sht-env');
const UNIT = 1024;

// 生成页面的 环境变量
const shtEnv = Object.keys(process.env).reduce((env, key) => {
  if (key.startsWith('SHT_')) {
    env[key] = JSON.stringify(process.env[key])
  }
  return env
}, Object.create(null));

module.exports = {
  UNIT,
  shtEnv,
}
