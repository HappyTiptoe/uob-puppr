const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { commentID } = req.params
  const { newBody } = req.body

  await db.comments.update(commentID, 'body', newBody)

  return res.status(200).send({ msg: 'Comment updated successfully.' })
}
