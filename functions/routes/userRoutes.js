// USER ROUTES TO HANDLE NEW USERS, FETCHING ALL USERS AND/OR CURRENT USER

const database = require("../API/database")

module.exports = app => {
  app.get("/user", (req, res) => {
    if (req.user) {
      res.status(200).json(req.user)
    } else {
      res.status(404).json({ success: false, error: "user not authenticated" })
    }
  })

  // GET ALL USERS FROM DATABASE
  app.get("/users", async (req, res) => {
    try {
      const users = await database.getUsers()
      return res.json(users)
    } catch (error) {
      console.error(`Error getting users: ${error.message}`)
      return res.status(500).json({ success: false, error: error.message })
    }
  })

  // CREATE NEW USER IN DATABASE
  app.post("/users/new", async (req, res) => {
    try {
      const newUser = await database.newUser(req.body)
      return res.status(201).json({ success: true, user: newUser })
    } catch (error) {
      console.error(`Error creating a user: ${error.message}`)
      return res.status(500).json({ success: false, error: error.message })
    }
  })

  // FIND SPECIFIC USER OR CHECK IF SPECIFIC USER EXISTS
  app.post("/users/find", async (req, res) => {
    try {
      const search = await database.findUser(req.body.id)
      return res.status(200).json(search)
    } catch (error) {
      console.error(`Error finding a user: ${error.message}`)
      return res.status(500).json({ success: false, error: error.message })
    }
  })
}
