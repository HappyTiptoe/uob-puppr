const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params
  const { newImageURL } = req.body

  await db.users.update(username, 'imageURL', newImageURL)

  return res.status(200).send({ msg: 'Profile image updated successfully.' })
}
