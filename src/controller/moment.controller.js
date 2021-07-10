const fs = require('fs');
const path = require('path');
const momentService = require('../service/moment.service');
const commentService = require('../service/comment.service');
const fileService = require('../service/file.service');
const { APP_HOST, APP_PORT } = require('../app/config');

class MomentController {
  async create (ctx, next) {
    // 1.获取数据(用户id，动态内容)
    const { id } = ctx.user;
    const { content } = ctx.request.body;

    const result = await momentService.create(id, content);

    ctx.body = {
      code: 200,
      message: '发布动态成功~',
      data: result
    };
  }

  async details (ctx, next) {
    // 获取用户想要查看的动态的 ID
    const { momentId } = ctx.request.params;

    const [ moment ] = await momentService.getMomentById(momentId);
    const comments = await commentService.getCommentByMomentId(momentId);
    const labels = await momentService.getLabels(momentId);

    moment.images = moment.images.map(filename => filename = `${APP_HOST}:${APP_PORT}/moment/images/${filename}`);
    
    ctx.body = {
      code: 200,
      message: '获取动态成功~',
      data: {
        moment,
        labels,
        comments
      }
    }
  }

  async list (ctx, next) {
    // 获取 偏移量、数据量
    const { offset, size } = ctx.request.query;

    const moments = await momentService.getMomentList(offset, size);
    moments.forEach(item => {
      if (!item.images) item.images = [];
      if (!item.labels) item.labels = [];
      item.images = item.images.map(filename => filename = `${APP_HOST}:${APP_PORT}/moment/images/${filename}`);
    });

    ctx.body = {
      code: 200,
      message: '获取动态列表成功~',
      data: moments
    }
  }

  async update (ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await momentService.update(momentId, content);

    ctx.body = {
      code: 200,
      message: '动态修改成功~'
    };
  }

  async remove (ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 200,
      message: '删除动态成功~'
    };
  }

  async addLabels (ctx, next) {
    const { momentId } = ctx.params;
    const { labelIds } = ctx.request.body;

    for (let labelId of labelIds) {
      const isLabelExist = await momentService.hasLabel(momentId, labelId);
      if (!isLabelExist) await momentService.addLabel(momentId, labelId);
    }

    ctx.body = {
      code: 200,
      message: '给动态添加标签成功~'
    };
  }

  async getLabels (ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.getLabels(momentId);

    ctx.body = {
      code: 200,
      message: '获取当前动态的标签成功~',
      data: result
    }
  }

  async fileInfo (ctx, next) {
    try {
      const { filename } = ctx.params;
      const { type } = ctx.query;

      const [ file ] = await fileService.getFileByFilename(filename);
      
      if (file) {
        const { filepath, filename, mimetype } = file;
        let targetPath = filepath;
        if (type && ['large', 'middle', 'small'].includes(type)) {
          targetPath = `${path.dirname(filepath)}\\${filename.split('.')[0]}-${type}${path.extname(filename)}`;
        }
        ctx.response.set('content-type', mimetype);
        ctx.body = fs.createReadStream(targetPath);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', new Error('资源未找到~'), ctx);
    }
  }
}

module.exports = new MomentController();