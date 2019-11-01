class ProjectRepository {
    constructor(ctx) {
      this.ctx = ctx;
    }
  
    async createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`
      return await this.ctx.run(sql);
    }

    async getById(id) {
      return await this.ctx.get(
        `SELECT * FROM projects WHERE id = @id`,
        {
          id
        })
    }

    async getAll() {
      return await this.ctx.all(`SELECT * FROM projects`)
    }

    async create(name) {
      return await this.ctx.run(
        'INSERT INTO projects (name) VALUES (@name)',
        {
          name
        })
    }

    async update(project) {
      const { id, name } = project;
      return await this.ctx.run(
        `UPDATE projects SET name = ? WHERE id = ?`,
        [name, id]
      )
    }

    async delete(id) {
      return await this.ctx.run(
        `DELETE FROM projects WHERE id = ?`,
        [id]
      )
    }

    async getTasks(projectId) {
      return await this.ctx.all(
        `SELECT * FROM tasks WHERE projectId = ?`,
        [projectId])
    }
  }
  
  module.exports = ProjectRepository;