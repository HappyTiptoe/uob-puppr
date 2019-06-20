const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params
  const { newBio } = req.body

  console.log(`here?`)
  await db.users.update(username, 'bio', newBio)
  console.log(`here?2`)

  return res.status(200).send({ msg: 'Bio updated successfully.' })
}
