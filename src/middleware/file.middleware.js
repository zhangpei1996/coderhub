const path = require('path');
const multer = require('@koa/multer');
const jimp = require('jimp');

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: `./uploads/avatar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
    filename: (req, file, cb) => {
      cb(null, `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })
});

const avatarHandler = avatarUpload.single('avatar');

const pictureUpload = multer({
  storage: multer.diskStorage({
    destination: `./uploads/picture/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
    filename: (req, file, cb) => {
      cb(null, `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })
});

const pictureHandler = pictureUpload.array('picture', 9);

// 将用户上传的原图，处理为几种不同的像素，以便不同场景使用
// 例如：在动态列表中显示小图，动态详情中显示中等图片，当用户点击图片则显示大图
const pictureResize = async (ctx, next) => {
  // 获取所有的图像信息
  const { files } = ctx;

  // 对图像进行处理,可使用第三方库：sharp(体积较大)、jimp(体积较小)
  for (let file of files) {
    const { path: filepath, destination, filename } = file;
    const destPath = path.join(destination, filename.split('.')[0]);
    // jimp.read() 读取文件并处理，返回的是一个 promise 对象
    jimp.read(filepath).then(image => {
      // 大图
      image.resize(1280, jimp.AUTO).write(`${destPath}-large${path.extname(filename)}`);
      // 中等图片
      image.resize(640, jimp.AUTO).write(`${destPath}-middle${path.extname(filename)}`);
      // 小图
      image.resize(320, jimp.AUTO).write(`${destPath}-small${path.extname(filename)}`);
    });
  }

  await next();
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
};