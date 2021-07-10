const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { 
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware');
const { 
  saveAvatarInfo,
  savePictrueInfo
} = require('../controller/file.controller');

const router = new Router({ prefix: '/upload' });

// 上传用户头像
router.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);

// 上传动态配图
router.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictrueInfo)

module.exports = router;