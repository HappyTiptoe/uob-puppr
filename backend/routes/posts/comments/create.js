const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params
  const { author, body } = req.body

  await db.comments.create(author, body, postID)

  return res.status(200).send({ msg: 'Comment posted successfully.' })
}
