const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params

  const favoritedPostIDs = await db.favorites.findAllBy('username', username)
  if (!favoritedPostIDs) return res.status(404).send({ msg: `No favorites found for user [${username}].` })

  return res.status(200).send({ favoritedPostIDs })
}
