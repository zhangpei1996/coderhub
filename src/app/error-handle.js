const errorTypes = require('../constants/error-types');

// 全局错误处理函数
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = errorTypes.NAME_OR_PASSWORD_IS_REQUIRED;
      break;
    case errorTypes.USERNAME_ALEADY_EXISTS:
      status = 409;
      message = errorTypes.USERNAME_ALEADY_EXISTS;
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 401;
      message = errorTypes.USER_DOES_NOT_EXISTS;
      break;
    case errorTypes.INCORRECT_USERNAME_OR_PASSWORD:
      status = 401;
      message = errorTypes.INCORRECT_USERNAME_OR_PASSWORD;
      break;
    case errorTypes.UNAUTHORIZED:
      status = 401;
      message = errorTypes.UNAUTHORIZED;
      break;
    case errorTypes.UNPREMISSION:
      status = 401;
      message = errorTypes.UNPREMISSION;
      break;
    default:
      status = 404;
      message = error.message;
  }
  
  ctx.status = status;
  ctx.body = {
    code: status,
    message
  };
};

module.exports = errorHandler;