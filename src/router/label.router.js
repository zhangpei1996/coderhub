const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');

const {
  create,
  list
} = require('../controller/label.controller');

const router = new Router({ prefix: '/label' });

// 创建标签接口
router.post('/', verifyAuth, create);

// 获取所有的标签
router.get('/', list);

module.exports = router;