const db = require(`${process.env.PWD}/database/db`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { name, username, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 8)

  // create user
  await db.users.create(name, username, hashedPassword)

  // fetch newly created user (as if logging in)
  const user = await db.users.findOneBy('username', username)
  if (!user) return res.status(404).send({ msg: `No user found with username [${username}].` })

  // remove password from return object
  delete user.password

  // create access token
  const token = jwt.sign({ id: user.id }, 'universityofbristol', { expiresIn: 600 })
  return res.status(200).send({ user, token, msg: 'Registration successful.' })
}
