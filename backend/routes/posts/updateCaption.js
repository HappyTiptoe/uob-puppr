const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params
  const { newCaption } = req.body

  await db.posts.update(postID, 'caption', newCaption)

  return res.status(200).send({ msg: 'Caption updated successfully.' })
}
