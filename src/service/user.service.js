const db = require('../app/database');

class UserService {
  async create (user) {
    try {
      const { name, password } = user;
      const sql = `
        INSERT INTO user (name, password) VALUES (?, ?)
      `;
      const [ result ] = await db.execute(sql, [name, password]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserByName (name) {
    const sql = `
      SELECT * 
      FROM user 
      WHERE name = ? 
      LIMIT 0, 1
    `;
    const [ result ] = await db.execute(sql, [name]);
    return result;
  }

  async updateAvatarUrlByUserId (avatarUrl, userId) {
    const sql = `
      UPDATE user SET avatar_url = ? WHERE id = ?
    `;

    const [ result ] = await db.execute(sql, [avatarUrl, userId]);

    return result;
  }
}

module.exports = new UserService();