const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params

  const user = await db.users.findOneBy('username', username)
  if (!user) return res.status(404).send({ msg: `No user found with username [${username}].` })

  return res.status(200).send({ user })
}
