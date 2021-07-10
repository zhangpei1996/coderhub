const Router = require('koa-router');

const {
  create,
  details,
  list,
  update,
  remove,
  addLabels,
  getLabels,
  fileInfo
} = require('../controller/moment.controller');

console.log(1);

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

const router = new Router({ prefix: '/moment' });

// 发布动态
router.post('/', verifyAuth, create);

// 根据id获取动态详情
router.get('/:momentId', details);

// 获取动态列表
router.get('/', list);

// 修改动态，用户必须登录，用户必须具备权限
router.patch('/:momentId', verifyAuth, verifyPermission('moment'), update);

// 删除动态
router.delete('/:momentId', verifyAuth, verifyPermission('moment'), remove);

// 给动态添加标签
router.post('/:momentId/labels', verifyAuth, addLabels);

// 获取动态的标签
router.get('/:momentId/labels', getLabels);

// 获取动态配图
router.get('/images/:filename', fileInfo);

module.exports = router;