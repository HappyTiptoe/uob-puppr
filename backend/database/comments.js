class CommentsTable {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS comments (
      id         integer PRIMARY KEY AUTOINCREMENT,
      author     string,
      body       text,
      date       datetime,
      postID     integer,
      CONSTRAINT posts_fk FOREIGN KEY (postID)   REFERENCES posts(id),
      CONSTRAINT users_fk FOREIGN KEY (author) REFERENCES users(author)
    )`
    return this.DAO.run(query)
  }

  all() {
    const query = `SELECT * FROM comments`
    return this.DAO.all(query)
  }

  findOneBy(field, value) {
    const query = `SELECT * FROM comments WHERE ${field} = ?`
    return this.DAO.get(query, [value])
  }

  findAllBy(field, value) {
    const query = `SELECT * FROM comments WHERE ${field} = ?`
    return this.DAO.all(query, [value])
  }

  create(author, body, postID) {
    const date = Date.now()
    const query = `INSERT INTO comments (author, body, date, postID)
                   VALUES (?, ?, ?, ?)`
    return this.DAO.run(query, [author, body, date, postID])
  }

  update(id, field, newValue) {
    const query = `UPDATE comments SET ${field} = ? WHERE id = ?`
    return this.DAO.run(query, [newValue, id])
  }

  destroy(id) {
    const query = `DELETE FROM comments WHERE id = ?`
    return this.DAO.run(query, [id])
  }
}

module.exports = CommentsTable
