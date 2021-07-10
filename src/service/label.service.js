const db = require('../app/database');

class LabelService {
  async create (name) {
    const sql = `
      INSERT INTO label (name) VALUES (?)
    `;

    const [ result ] = await db.execute(sql, [name]);

    return result;
  }

  async getLabels () {
    const sql = `
      SELECT * FROM label
    `;

    const [ result ] = await db.execute(sql);

    return result;
  }
}

module.exports = new LabelService();