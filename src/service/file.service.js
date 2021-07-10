const db = require('../app/database'); 

class FileService {
  async saveAvatarInfo (filepath, filename, mimetype, size, userId) {
    const sql = `
      INSERT INTO avatar (filepath, filename, mimetype, size, user_id) VALUES (?, ?, ?, ?, ?)
    `;

    const [ result ] = await db.execute(sql, [filepath, filename, mimetype, size, userId]);

    return result;
  }

  async getAvatarByUserId (userId) {
    const sql = `
      SELECT * FROM avatar WHERE user_id = ?
    `;

    const [ result ] = await db.execute(sql, [userId]);

    return result;
  }

  async createFile (filepath, filename, mimetype, size, momentId, userId) {
    const sql = `
      insert into file (filepath, filename, mimetype, size, moment_id, user_id) values (?, ?, ?, ?, ?, ?);
    `;

    const [ result ] = await db.execute(sql, [filepath, filename, mimetype, size, momentId, userId]);

    return result;
  }

  async getFileByFilename (filename) {
    const sql = `
      SELECT * FROM file WHERE filename = ?;
    `;

    const [ result ] = await db.execute(sql, [filename]);

    return result;
  }
}

module.exports = new FileService();