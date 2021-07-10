const errorTypes = require('../constants/error-types');
const { getUserByName } = require('../service/user.service');
const md5Password = require('../utils/password-handle');

// 验证用户
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断这次注册的用户名有没有被注册过
  const result = await getUserByName(name);
  if (result.length > 0) {
    const error = new Error(errorTypes.USERNAME_ALEADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
};

// 对密码进行加密处理
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  // 使用 md5 对密码进行加密
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword
}