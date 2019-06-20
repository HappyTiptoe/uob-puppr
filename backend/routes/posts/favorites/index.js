/*
  prefix: /posts/:postID/favorites
*/
const PostFavoritesRouter = require('express').Router({ mergeParams: true })

/* route handlers */
/* post */
PostFavoritesRouter.post('/', require('./create'))
// => params: { postID }, body: { username }

/* get */
PostFavoritesRouter.get('/', require('./getNumber'))
// => params: { postID }, body: {}

/* patch */
// none

/* delete */
PostFavoritesRouter.delete('/delete', require('./delete'))
// => params: { postID, favoriteID }, body: {}

module.exports = PostFavoritesRouter
