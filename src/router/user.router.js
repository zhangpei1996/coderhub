const Router = require('koa-router');
const {
  create,
  avatarInfo
} = require('../controller/user.controller');
const {
  verifyUser, // 用户校验函数
  handlePassword, // 密码加密
} = require('../middleware/user.middleware');

const router = new Router({ prefix: '/users' });

// 注册用户
router.post('/register', verifyUser, handlePassword, create);

// 获取用户头像信息
router.get('/:userId/avatar', avatarInfo)

module.exports = router;