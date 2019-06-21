const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params
  const { newBio } = req.body

  await db.users.update(username, 'bio', newBio)

  return res.status(200).send({ msg: 'Bio updated successfully.' })
}
