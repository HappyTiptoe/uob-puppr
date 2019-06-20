const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { commentID } = req.params

  await db.comments.destroy(commentID)

  return res.status(200).send({ msg: 'Comment deleted successfully.' })
}
