const service = require('../service/comment.service');

class CommentController {
  async create (ctx, next) {
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body;

    const result = await service.create(content, momentId, id);

    ctx.body = {
      code: 200,
      message: '发表评论成功~'
    }
  }

  async replay (ctx, next) {
    const { commentId } = ctx.params;
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await service.replay(content, momentId, id, commentId);

    ctx.body = {
      code: 200,
      message: '回复评论成功~'
    };
  }

  async update (ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await service.update(content, commentId);

    ctx.body = {
      code: 200,
      message: '修改评论成功~'
    };
  }

  async remove (ctx, next) {
    const { commentId } = ctx.params;

    const result = await service.remove(commentId);

    ctx.body = {
      code: 200,
      message: '删除评论成功~'
    };
  }

  async list (ctx, next) {
    const { momentId } = ctx.query;

    const result = await service.getCommentByMomentId(momentId);

    ctx.body = {
      code: 200,
      message: '获取评论数据成功~',
      data: result
    }
  }
}

module.exports = new CommentController();