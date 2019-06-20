const DAO = require('./dao')
const UsersTable = require('./users')
const PostsTable = require('./posts')
const CommentsTable = require('./comments')
const FavoritesTable = require('./favorites')

class Database {
  constructor(dbFilePath) {
    this.DAO = new DAO(dbFilePath)

    this.users = new UsersTable(this.DAO)
    this.users.createTable()

    this.posts = new PostsTable(this.DAO)
    this.posts.createTable()

    this.comments = new CommentsTable(this.DAO)
    this.comments.createTable()

    this.favorites = new FavoritesTable(this.DAO)
    this.favorites.createTable()

    console.log(`Database initialized...`)
  }
}

module.exports = new Database(`${__dirname}/database`)
