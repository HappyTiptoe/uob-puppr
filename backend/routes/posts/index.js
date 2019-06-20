/*
  prefix: /posts
*/
const PostsRouter = require('express').Router()

/* subroute handlers */
PostsRouter.use('/:postID/comments', require('./comments'))
PostsRouter.use('/:postID/favorites', require('./favorites'))

/* route handlers */
/* post */
PostsRouter.post('/', require('./create'))
// => params: {}, body: { author, caption, imageURL }

/* get */
PostsRouter.get('/:postID', require('./getOne'))
// => params: { postID }, body: {}
PostsRouter.get('/', require('./getAll'))
// => params: {}, body: {}

/* patch */
PostsRouter.patch('/:postID/caption', require('./updateCaption'))
// => params: { postID }, body: { newCaption }

/* delete */
PostsRouter.delete('/:postID/delete', require('./delete'))
// => params: { postID }, body: {}

module.exports = PostsRouter
