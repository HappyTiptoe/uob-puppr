/*
  prefix: none
*/
const AuthRouter = require('express').Router()

/* Route Handlers */
AuthRouter.post('/register', require('./register'))
// => params: {}, body: { name, username, password }

AuthRouter.post('/login', require('./login'))
// => params: {}, body: { username, password }

module.exports = AuthRouter
