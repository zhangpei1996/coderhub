const db = require('../app/database');

class AuthService {
  async checkResource (tabName, id, userId) {
    const sql = `
      SELECT * FROM ${tabName} WHERE id = ? AND user_id = ?
    `;

    const [ result ] = await db.execute(sql, [id, userId]);

    return result.length > 0;
  }
}

module.exports = new AuthService();