const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { postID } = req.params

  const comments = await db.comments.findAllBy('postID', postID)
  if (!comments) return res.status(404).send({ msg: 'No comments found.' })

  return res.status(200).send({ comments })
}
