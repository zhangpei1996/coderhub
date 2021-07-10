const Router = require('koa-router');

const {
  login,
  isLogin
} = require('../controller/auth.controller');

const {
  verifyLogin, // 登录校验函数
  verifyAuth // 授权校验函数
} = require('../middleware/auth.middleware');

const router = new Router();

router.post('/login', verifyLogin, login);

router.get('/isLogin', verifyAuth, isLogin);

module.exports = router;