const jwt = require('jsonwebtoken');
const { PRIVITE_KEY } = require('../app/config');

class AuthController {
  async login (ctx, next) {
    const { id, name } = ctx.user;

    // 生成 Token 令牌
    const token = jwt.sign({ id, name }, PRIVITE_KEY, {
      algorithm: 'RS256',
      expiresIn: 24 * 60 * 60
    });
    
    ctx.body = {
      code: 200,
      message: '登陆成功~',
      data: {
        id,
        name,
        token
      }
    }
  }

  async isLogin (ctx, next) {
    ctx.body = {
      code: 200,
      message: '鉴权成功~',
      data: ctx.user
    }
  }
}

module.exports = new AuthController();