const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params
  const { username } = req.body

  // decrement number of favorites on post
  const post = await db.posts.findOneBy('id', postID)
  const newFavorites = post.favorites - 1
  await db.posts.update(postID, 'favorites', newFavorites)

  // remove favorite from database
  await db.favorites.destroy(postID, username)

  return res.status(200).send({ msg: 'Post removed from favorites.' })
}
