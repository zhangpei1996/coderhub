const db = require('../app/database');

class MomentService {
  // 将用户发布的动态插入到数据库
  async create (userId, content) {
    const sql = `
      INSERT INTO moment (content, user_id) VALUES (?, ?);
    `;
    const [ result ] = await db.execute(sql, [content, userId]);
    
    return result;
  }

  // 根据 ID 获取动态详情、
  async getMomentById (momentId) {
    /**
     ** 将动态、评论、标签通过一条 SQL 查询出来
      * 这里存在一个问题，如果使用连接查询查评论列表，会导致标签列表重复，所以采用子查询查评论数据
      *  SELECT 
      *    m.id, m.content, m.createAt createTime, m.updateAt updateTime,
      *    JSON_OBJECT('id', u.id, 'name', u.name) author,
      *    JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) labels,
      *    (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
      *      JSON_OBJECT(
      *        'id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 'updateTime', c.updateAt,
      *        'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
      *      )
      *    ), null) FROM comment c LEFT JOIN user cu ON cu.id = c.user_id WHERE c.moment_id = m.id) comments
      *  FROM moment m
      *  LEFT JOIN user u ON u.id = m.user_id
      *  LEFT JOIN moment_label ml ON ml.moment_id = m.id
      *  inner JOIN label l ON ml.label_id = l.id
      *  WHERE m.id = 7
      *  GROUP BY m.id
     */
    try {
      const sql = `
        SELECT 
          m.id, m.content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
          (SELECT JSON_ARRAYAGG(filename) FROM file WHERE file.moment_id = m.id) images
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        WHERE m.id = ?
      `;
      const [ result ] = await db.execute(sql, [momentId]);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // 获取动态列表
  async getMomentList (offset, size) {
    try {
      const sql = `
        SELECT 
          m.id, m.content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name) user,
          (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE m.id = ml.moment_id) labels,
          COUNT(c.moment_id) commentCount,
          (SELECT JSON_ARRAYAGG(file.filename) FROM file WHERE file.moment_id = m.id) images
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        LEFT JOIN comment c ON c.moment_id = m.id
        GROUP BY m.id
        LIMIT ?, ?
      `;
      const [ result ] = await db.execute(sql, [offset, size]);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async update (momentId, content) {
    const sql = `
      UPDATE moment SET content = ? WHERE id = ?
    `;

    const [ result ] = await db.execute(sql, [content, momentId]);

    return result;
  }

  async remove (moemntId) {
    const sql = `
      DELETE FROM moment WHERE id = ?
    `;

    const [ result ] = await db.execute(sql, [moemntId]);

    return result;
  }

  async addLabel (momentId, labelId) {
    const sql = `
      INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)
    `;

    const [ result ] = await db.execute(sql, [momentId, labelId]);

    return result;
  }

  async hasLabel (momentId, labelId) {
    const sql = `
      SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?
    `;

    const [ result ] = await db.execute(sql, [momentId, labelId]);

    return result.length > 0;
  }

  async getLabels (momentId) {
    const sql =  `
      select l.id, l.name
      from moment_label ml
      left join label l on l.id = ml.label_id
      where ml.moment_id = ?
    `;

    const [ result ] = await db.execute(sql, [momentId]);

    return result;
  }
}

module.exports = new MomentService();