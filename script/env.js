// 读取 `.env.${process.env.FILE_ENV}` 注入到环境变量中
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
if (process.env.FILE_ENV) {
  dotenv.config({ path: `.env.${process.env.FILE_ENV}`, override: true });
}
// .env.local 有优先级最高，覆盖所有环境变量配置
dotenv.config({ path: '.env.local', override: true });

