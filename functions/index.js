const functions = require("firebase-functions")
const admin = require("firebase-admin")
const firebase = require("firebase")
const express = require("express")
const passport = require("passport")
require("./services/discordOauth")

// YOUR FIREBASE CONFIG OBJECT GOES HERE
const { config } = require("./info")

const app = express()

// COOKIE PARSER AND EXPRESS SESSION ARE NEEDED
// TO MAINTAIN THE USER'S SESSION ACROSS REQUESTS
// SEND A PR IF YOU FIND WAYS TO IMPROVE THIS SYSTEM

app.use(require("cookie-parser")())

app.use(
  require("express-session")({
    secret: "MY_SECRET_COOKIE_KEY",
    resave: true,
    saveUninitialized: true
  })
)

// INITIALIZES PASSPORT. OAUTH2 WILL NOT WORK WITHOUT THESE 2 LINES
app.use(passport.initialize())
app.use(passport.session())

// MAKES OUR EXPRESS APP USE THE ROUTES DEFINED IN THE BELOW FILES
require("./routes/authRoutes")(app)
require("./routes/userRoutes")(app)

// INITIALIZE OUR FIREBASE APP
admin.initializeApp()
firebase.initializeApp(config)

// EXPORT OUR FIREBASE FUNCTIONS
exports.api = functions.https.onRequest(app)
