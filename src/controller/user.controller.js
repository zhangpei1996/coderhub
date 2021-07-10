const fs = require('fs');
const userService = require('../service/user.service');
const fileService = require('../service/file.service');

class UserController {
  async create (ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 操作数据库
    const result = await userService.create(user);

    // 返回数据
    ctx.body = {
      code: 200,
      message: '用户注册成功~'
    };
  }

  async avatarInfo (ctx, next) {
    const { userId } = ctx.params;

    const result = await fileService.getAvatarByUserId(userId);
    const lastFile = result.pop();

    if (lastFile) {
      ctx.response.set('content-type', lastFile.mimetype);
      ctx.body = fs.createReadStream(`${lastFile.filepath}`);
    } else {
      ctx.app.emit('error', new Error('资源不存在~'), ctx);
    }
  }
}

module.exports = new UserController();