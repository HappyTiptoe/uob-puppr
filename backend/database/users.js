class UserRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      username  string PRIMARY KEY UNIQUE,
      bio       text,
      date      datetime,
      imageURL  text,
      name      string,
      password  text
    )`
    return this.DAO.run(query)
  }

  all() {
    const query = `SELECT * FROM users`
    return this.DAO.all(query)
  }

  findOneBy(field, value) {
    const query = `SELECT * FROM users WHERE ${field} = ?`
    return this.DAO.get(query, [value])
  }

  findAllBy(field, value) {
    const query = `SELECT * FROM users WHERE ${field} = ?`
    return this.DAO.all(query, [value])
  }

  create(name, username, password) {
    const date = Date.now()
    const defaultBio = 'I ♥ puppr!'
    const defaultImageURL = 'https://us.123rf.com/450wm/meenna/meenna1410/meenna141000476/33330571--dog-design-profile-.jpg?ver=6'

    const query = `INSERT INTO users (username, bio, date, name, password, imageURL)
                   VALUES(?, ?, ?, ?, ?, ?)`
    return this.DAO.run(query, [username, defaultBio, date, name, password, defaultImageURL])
  }

  update(username, field, newValue) {
    const query = `UPDATE users SET bio = ? WHERE username = ?`
    return this.DAO.run(query, [newValue, username])
  }

  destroy(username) {
    const query = `DELETE FROM users WHERE username = ?`
    return this.DAO.run(query, [username])
  }
}

module.exports = UserRepo
