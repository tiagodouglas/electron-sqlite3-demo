class TaskRepository {
    constructor(ctx) {
      this.ctx = ctx;
    }
  
    async createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          isComplete INTEGER DEFAULT 0,
          projectId INTEGER,
          CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
            REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
      return await this.ctx.run(sql);
    }


    async getById(id) {
        return await this.dao.get(
        `SELECT * FROM tasks WHERE id = ?`,
        [id])
    }

    async create(name, description, isComplete, projectId) {
        return await this.ctx.run(
          `INSERT INTO tasks (name, description, isComplete, projectId)
            VALUES (?, ?, ?, ?)`,
          [name, description, isComplete, projectId])
      }

      async update(task) {
        const { id, name, description, isComplete, projectId } = task
        return await this.ctx.run(
          `UPDATE tasks
          SET name = ?,
            description = ?,
            isComplete = ?,
            projectId = ?
          WHERE id = ?`,
          [name, description, isComplete, projectId, id]
        )
      }

      async delete(id) {
        return await this.ctx.run(
          `DELETE FROM tasks WHERE id = ?`,
          [id]
        )
      }
  }
  
  module.exports = TaskRepository;