// THE PASSPORT/DISCORD OAUTH2 STRATEGY DEFINITION

const passport = require("passport")
const DiscordStrategy = require("passport-discord").Strategy
const database = require("../API/database")
const { oauthKeys } = require("../info")
passport.serializeUser((user, done) => {
  done(null, user.uid)
})

// CHECKS IF A USER ALREADY EXISTS
// IF HE EXISTS, UPDATE THEM, OTHERWISE, CREATE THEM
// FOR MORE INFORMATION ON HOW PASSPORT-JS WORKS, HEAD TO THEIR WEBSITE
passport.deserializeUser(async (uid, done) => {
  try {
    const user = await database.findUser(uid)
    if (user.success === true) {
      done(null, user.user)
    } else {
      done(null)
    }
  } catch (error) {
    console.log(`Error deserializing user: ${error.message}`)
    done(error)
  }
  database
    .findUser(uid)
    .then(user => {
      done(null, user.user)
    })
    .catch(error => {
      console.log(`Error deserializing user: ${error.message}`)
    })
})
// SCOPES DEFINED BY DISCORD TO GRAB USER PERMISSIONS
var scopes = oauthKeys.scopes

// DEFINES THE DISCORD OAUTH2 STRATEGY
passport.use(
  new DiscordStrategy(
    {
      clientID: oauthKeys.clientID,
      clientSecret: oauthKeys.clientSecret,
      callbackURL: "/api/auth",
      scope: scopes,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const uid = profile.id
        const searchUser = await database.findUser(uid)
        console.log(`SEARCH USER RESULT: ${searchUser}`)
        if (searchUser.success === true) {
          // user exists
          // update user information
          console.log("EXISTING USER")
          done(null, searchUser.user)
          return searchUser.user
        } else {
          // create a new user
          const newUser = {
            username: profile.username,
            discriminator: profile.discriminator,
            uid: profile.id,
            email: profile.email,
            avatar: profile.avatar,
            guilds: profile.guilds,
            token: accessToken,
            refreshToken: refreshToken
          }
          await database.newUser(newUser)
          done(null, newUser)
        }
      } catch (error) {
        return console.error(`Error creating a user: ${error}`)
      }
    }
  )
)
