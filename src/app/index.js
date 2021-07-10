const path = require('path');
const Koa = require('koa');
const koaBodyparser = require('koa-bodyparser');

// 导入路由注册函数
const useRoutes = require('../router');

// 导入错误处理中间件
const errorHandler = require('./error-handle');

// 创建应用程序
const app = new Koa();

// 使用 application/json、application/x-www-form-urlencode 参数解析中间件
app.use(koaBodyparser({
  formLimit: '10mb',
  jsonLimit: '10mb'
}));

// 调用路由注册函数，注册路由表
useRoutes(app);

// 监听错误并处理
app.on('error', errorHandler);

module.exports = app;