/*
  prefix: /users/:username/posts
*/
const UserPostsRouter = require('express').Router({ mergeParams: true })

/* route handlers */
/* post */
// none

/* get */
UserPostsRouter.get('/', require('./getAll'))
// => params: { username }, body: {}

/* patch */
// none

/* delete */
// none

module.exports = UserPostsRouter
