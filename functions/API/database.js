// EXECUTES DATABASE FUNCTIONALITY RELATED TO FIRESTORE

const admin = require("firebase-admin")

module.exports.findUser = async uid => {
  let obj
  try {
    const user = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
    if (!user.exists) {
      obj = { success: false, error: `user with uid ${uid} does not exist` }
    } else {
      obj = { success: true, user: user.data() }
    }
  } catch (error) {
    console.log(`SEARCH USER ERROR: ${error.message}`)
    obj = { success: false, error: error.message }
    console.log("RETURNING OBJECT:")
    console.log(obj)
  }
  return obj
}

module.exports.getUsers = async () => {
  let obj
  try {
    const users = []
    const data = await admin
      .firestore()
      .collection("users")
      .orderBy("createdAt", "desc")
      .get()
    data.forEach(user => {
      users.push(user.data())
    })
    obj = { success: true, users: users }
  } catch (error) {
    console.error(`Error getting users: ${error}`)
    obj = { success: false, error: error.message }
  }
  return obj
}

module.exports.newUser = async profile => {
  let obj
  try {
    const userRecord = await admin.auth().createUser(profile)
    await admin
      .firestore()
      .doc(`/users/${profile.uid}`)
      .set(profile)
    obj = { success: true, user: userRecord }
  } catch (error) {
    console.error(`Error creating a user: ${error}`)
    obj = { success: false, error: error.message }
  }
  return obj
}
