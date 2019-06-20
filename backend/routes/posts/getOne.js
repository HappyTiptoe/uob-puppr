const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params

  const post = await db.posts.findOneBy('id', postID)
  if (!post) return res.status(404).send({ msg: 'No post found.' })

  return res.status(200).send({ post })
}
