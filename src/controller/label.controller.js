const service = require('../service/label.service');

class LabelController {
  async create (ctx, next) {
    const { name } = ctx.request.body;

    const result = await service.create(name);

    ctx.body = {
      code: 200,
      message: '创建标签成功~'
    };
  }

  async list (ctx, next) {
    const result = await service.getLabels();

    ctx.body = {
      code: 200,
      message: '获取标签列表成功~',
      data: result
    }
  }
}

module.exports = new LabelController();