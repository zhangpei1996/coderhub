const jwt = require('jsonwebtoken');
const errorTypes = require('../constants/error-types');
const { getUserByName } = require('../service/user.service');
const { checkResource } = require('../service/auth.service');
const md5Password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

// 登录校验函数
const verifyLogin = async (ctx, next) => {
  try {
    // 1.获取用户名和密码
    const { name, password } = ctx.request.body;
  
    // 2.检查用户名和密码是否为空
    if (!name || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit('error', error, ctx);
    }
  
    // 3.检查用户是否存在
    const [ user ] = await getUserByName(name);
    if (!user) {
      const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
      return ctx.app.emit('error', error, ctx);
    }
  
    // 4.判断用户名与密码是否一致
    if (user.password !== md5Password(password)) {
      const error = new Error(errorTypes.INCORRECT_USERNAME_OR_PASSWORD);
      return ctx.app.emit('error', error, ctx);
    }

    ctx.user = user;
  
    await next();
  } catch (err) {
    console.log(err);
    ctx.app.emit('error', err, ctx);
  }
};

// 授权校验函数
const verifyAuth = async (ctx, next) => {
  try {
    // 1.拿到 token
    const token = ctx.request.headers['x-token'];

    // 2.校验 token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });

    ctx.user = result;

    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZED);
    ctx.app.emit('error', error, ctx);
  }
};

// 权限校验函数
const verifyPermission = (tabName) => {
  return async (ctx, next) => {
    try {
      const resourceId = ctx.params[`${tabName}Id`];
      const { id } = ctx.user;
    
      // 校验用户是否某些资源的操作权限
      const isPremission = await checkResource(tabName, resourceId, id);
      if (!isPremission) throw new Error();

      await next();
    } catch (err) {
      console.log(err);
      const error = new Error(errorTypes.UNPREMISSION);
      return ctx.app.emit('error', error, ctx)
    }
  };
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}