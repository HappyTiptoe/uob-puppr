const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params

  // find current post
  const post = await db.posts.findOneBy('id', postID)
  if (!post) return res.status(404).send({ msg: 'No post found.' })

  // find how many favorites it has
  const numFavorites = post.favorites

  return res.status(200).send({ numFavorites })
}
