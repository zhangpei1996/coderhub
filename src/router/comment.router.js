const Router = require('koa-router');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const {
  create,
  replay,
  update,
  remove,
  list
} = require('../controller/comment.controller');

const router = new Router({ prefix: '/comment' });

// 发表评论接口
router.post('/', verifyAuth, create);

// 回复评论
router.post('/:commentId/replay', verifyAuth, replay);

// 修改评论
router.patch('/:commentId', verifyAuth, verifyPermission('comment'), update);

// 删除评论
router.delete('/:commentId', verifyAuth, verifyPermission('comment'), remove);

// 获取评论列表接口
router.get('/', list);

module.exports = router;