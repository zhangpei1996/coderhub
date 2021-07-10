const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 将 .env 文件中的配置导入到 process.env 环境变量中
dotenv.config();

// 读取公钥和私钥
const PRIVITE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/privite.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVITE_KEY,
  PUBLIC_KEY
};