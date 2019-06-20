const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params
  const { username } = req.body

  // create a Favorite
  await db.favorites.create(postID, username)

  // increment number of favorites on post
  const post = await db.posts.findOneBy('id', postID)
  const newFavorites = post.favorites + 1
  await db.posts.update(postID, 'favorites', newFavorites)

  return res.status(200).send({ msg: 'Post added to favorites.' })
}
