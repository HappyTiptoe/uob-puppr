/*
  prefix: /users/:username
*/
const UsersRouter = require('express').Router({ mergeParams: true })

/* subroute handlers */
UsersRouter.use('/posts', require('./posts'))
UsersRouter.use('/favorites', require('./favorites'))

/* route handlers */
/* post */
// handled in @/routes/auth/

/* get */
UsersRouter.get('/', require('./getOne'))
// => params: { username }, body: {}
UsersRouter.get('/image', require('./getImageURL'))
// => params: { username }, body: {}

/* patch */
UsersRouter.patch('/bio', require('./updateBio'))
// => params: { username }, body: { newBio }
UsersRouter.patch('/image', require('./updateImageURL'))
// => params: { username }, body: { newImageURL }

/* delete */
UsersRouter.delete('/delete', require('./delete'))
// => params: { username }, body: {}

module.exports = UsersRouter
