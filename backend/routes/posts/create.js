const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { author, caption, imageURL } = req.body

  await db.posts.create(author, caption, imageURL)

  return res.status(200).send({ msg: 'Post created successfully.' })
}
