const app = require('./app/index');
const config = require('./app/config');
require('./app/database');

const server = app.listen(config.APP_PORT, () => {
  // console.log(server.address().port);
  console.log(`服务器在${config.APP_PORT}端口启动成功`);
});