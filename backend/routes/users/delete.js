const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params

  await db.users.destroy(username)

  return res.status(200).send({ msg: 'User deleted successfully.' })
}
