const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
  async saveAvatarInfo (ctx, name) {
    const { path, filename, mimetype, size } = ctx.file;
    const { id } = ctx.user;
    
    const result = await fileService.saveAvatarInfo(path, filename, mimetype, size, id);

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlByUserId(avatarUrl, id);
    
    ctx.body = {
      code: 200,
      message: '上传用户头像成功~'
    };
  }

  async savePictrueInfo (ctx, next) {
    const { files } = ctx;
    const { id } = ctx.user;
    const { momentId } = ctx.request.body;

    for (let file of files) {
      const { path, filename, mimetype, size } = file;
      await fileService.createFile(path, filename, mimetype, size, momentId, id);
    }

    ctx.body = {
      code: 200,
      message: '上传动态配图成功~'
    };
  }
}

module.exports = new FileController();