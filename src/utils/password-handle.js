const crypto = require('crypto');

const md5Password = (password) => {
  const md5 = crypto.createHash('md5');
  // digest() 将加密后的二进制数据转换为指定的格式
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = md5Password;