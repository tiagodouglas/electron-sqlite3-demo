const sql = require('better-sqlite3');

class DbContext {
  constructor(dbPath) {
    this.db = sql(dbPath);
  }

  async get(sql, params = {}) {
    return await this.db.prepare(sql).get(params);
  }

  async all(sql) {
    let query = this.db.prepare(sql)
    return await query.all();
  }

  async run(sql, params = {}) {
    let query = this.db.prepare(sql);
    return await query.run(params);
  }
}

module.exports = DbContext;