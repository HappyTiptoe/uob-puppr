const db = require(`${process.env.PWD}/database/db`)

module.exports = async (req, res) => {
  const { username } = req.params

  // get IDs of all favorited posts
  const favoritedPostIDs = await db.favorites.findAllBy('username', username)
  if (!favoritedPostIDs) return res.status(404).send({ msg: `No favorites found for user [${username}].` })

  const favoritedPosts = await findObjectsByIDs(favoritedPostIDs)

  return res.status(200).send({ favoritedPosts })
}

const findObjectsByIDs = async (array) => {
  let returnArray = []

  for (const f of array) {
    const post = await db.posts.findOneBy('id', f.postID)
    returnArray.push(post)
  }

  return returnArray
}
