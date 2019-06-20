/*
  prefix: /posts/:postID/comments
*/
const PostCommentsRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
/* post */
PostCommentsRouter.post('/', require('./create'))
// => params: { postID }, body: { author, body }

/* get */
PostCommentsRouter.get('/', require('./getAll'))
// => none

/* patch */
PostCommentsRouter.patch('/:commentID', require('./update'))
// => params: { commentID }, body: { newBody }

/* delete */
PostCommentsRouter.delete('/:commentID/delete', require('./delete'))
// => params: { commentID }, body: {}

module.exports = PostCommentsRouter
