const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params

  await db.posts.destroy(postID)

  return res.status(200).send({ msg: 'Your post has been deleted.' })
}
