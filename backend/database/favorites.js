class FavoritesTable {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      id         integer PRIMARY KEY AUTOINCREMENT,
      date       datetime,
      postID     integer,
      username   string,
      CONSTRAINT posts_fk FOREIGN KEY (postID)   REFERENCES posts(id),
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username)
    )`
    return this.DAO.run(query)
  }

  all() {
    const query = `SELECT * FROM favorites`
    return this.DAO.all(query)
  }

  findOneBy(field, value) {
    const query = `SELECT * FROM favorites WHERE ${field} = ?`
    return this.DAO.get(query, [value])
  }

  findAllBy(field, value) {
    const query = `SELECT * FROM favorites WHERE ${field} = ?`
    return this.DAO.all(query, [value])
  }

  create(postID, username) {
    const date = Date.now()
    const query = `INSERT INTO favorites (date, postID, username)
                   VALUES (?, ?, ?)`
    return this.DAO.run(query, [date, postID, username])
  }

  update(id, field, newValue) {
    const query = `UPDATE favorites SET ${field} = ? WHERE id = ?`
    return this.DAO.run(query, [newValue, id])
  }

  destroy(postID, username) {
    const query = `DELETE FROM favorites WHERE postID = ? AND username = ?`
    return this.DAO.run(query, [postID, username])
  }
}

module.exports = FavoritesTable
