const db = require(`${process.env.PWD}/database/db`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { username, password } = req.body
  console.log(`username/pass: ${username}/${password}`)

  // get user from database
  const user = await db.users.findOneBy('username', username)
  if (!user) return res.status(404).send({ msg: `Invalid username or password.` })

  // check if entered password matches record
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) return res.status(401).send({ msg: 'Invalid username or password.' })

  // remove password from return object
  delete user.password

  // create access token
  const token = jwt.sign({ id: user.id }, 'universityofbristol', { expiresIn: 600 })
  return res.status(200).send({ user, token, msg: 'Login successful.' })
}
