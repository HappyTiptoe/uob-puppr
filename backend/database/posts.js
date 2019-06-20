class PostsTable {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id         integer PRIMARY KEY AUTOINCREMENT,
      author     string,
      caption    text,
      date       datetime,
      favorites  integer,
      imageURL   string,
      CONSTRAINT users_fk FOREIGN KEY (author) REFERENCES users(author)
    )`
    return this.DAO.run(query)
  }

  all() {
    const query = `SELECT * FROM posts`
    return this.DAO.all(query)
  }

  findOneBy(field, value) {
    const query = `SELECT * FROM posts WHERE ${field} = ?`
    return this.DAO.get(query, [value])
  }

  findAllBy(field, value) {
    const query = `SELECT * FROM posts WHERE ${field} = ?`
    return this.DAO.all(query, [value])
  }

  create(author, caption, imageURL) {
    const date = Date.now()
    const query = `INSERT INTO posts (author, caption, date, favorites, imageURL)
                   VALUES (?, ?, ?, ?, ?)`
    return this.DAO.run(query, [author, caption, date, 0, imageURL])
  }

  update(id, field, newValue) {
    const query = `UPDATE posts SET ${field} = ? WHERE id = ?`
    return this.DAO.run(query, [newValue, id])
  }

  destroy(id) {
    const query = `DELETE FROM posts WHERE id = ?`
    return this.DAO.run(query, [id])
  }
}

module.exports = PostsTable
