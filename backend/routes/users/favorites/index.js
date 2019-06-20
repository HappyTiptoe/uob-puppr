/*
  prefix: /users/:username/favorites
*/
const UserFavoritesRouter = require('express').Router({ mergeParams: true })

/* route handlers */
/* post */
// none

/* get */
UserFavoritesRouter.get('/', require('./getAll'))
UserFavoritesRouter.get('/ids', require('./getAllIDs'))
// => params: { username }, body: {}

/* patch */
// none

/* delete */
// none

module.exports = UserFavoritesRouter
