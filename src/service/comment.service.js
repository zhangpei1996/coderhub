const db = require('../app/database');

class CommentService {
  async create (content, momentId, userId) {
    const sql = `
      INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);
    `;

    const [ result ] = await db.execute(sql, [content, momentId, userId]);

    return result;
  }

  async replay (content, momentId, userId, commentId) {
    const sql = `
      INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);
    `;

    const [ result ] = await db.execute(sql, [content, momentId, userId, commentId]);

    return result;
  }

  async update (content, commentId) {
    const sql = `
      UPDATE comment SET content = ? WHERE id = ?
    `;

    const [ result ] = await db.execute(sql, [content, commentId]);

    return result;
  }

  async remove (commentId) {
    const sql = `
      DELETE FROM comment WHERE id = ?
    `;

    const [ result ] = await db.execute(sql, [commentId]);

    return result;
  }

  async getCommentByMomentId (momentId) {
    const sql = `
      SELECT 
        c.id, c.content, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE c.moment_id = ?
    `;

    const [ result ] = await db.execute(sql, [momentId]);

    return result;
  }
}

module.exports = new CommentService();