const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params

  const posts = await db.posts.findAllBy('author', username)
  if (!posts) return res.status(404).send({ msg: `No posts found for user [${username}]` })

  return res.status(200).send({ posts })
}
