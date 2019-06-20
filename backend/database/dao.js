/*
  Creates an instance of an SQLite3 DAO
  (Data Access Object)
*/

const sqlite3 = require('sqlite3')

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) console.log(`Could not connect to database: ${err}`)
    })
  }

  run(query, params = []) {
    const db = this.db
    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  get(query, params = []) {
    const db = this.db
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) reject(err)
        resolve(row)
      })
    })
  }

  all(query, params = []) {
    const db = this.db
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
}

module.exports = AppDAO
