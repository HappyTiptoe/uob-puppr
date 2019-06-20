const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const posts = await db.posts.all()
  if (!posts) return res.status(404).send({ msg: 'No posts found.' })

  return res.status(200).send({ posts })
}
