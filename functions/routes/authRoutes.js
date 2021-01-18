// AUTHENTICATION ROUTES USING PASSPORT TO HANDLE THE OAUTH2 DANCE

const passport = require("passport")
const firebase = require("firebase")

// SCOPES DEFINED BY DISCORD TO GRAB USER PERMISSIONS
var scopes = require("../info").oauthKeys.scopes

module.exports = (app) => {
  app.get("/logout", async (req, res) => {
    await firebase.auth().signOut()
    req.logout()
    res.redirect("/api/user")
  })

  // THIS IS THE OAUTH2 CALLBACK ROUTE
  app.get(
    "/auth",
    passport.authenticate("discord", { failureRedirect: "/error" }),
    (req, res) => {
      // IF ALL WENT WELL, SEND THEM TO THE DASHBOARD.
      // DASHBOARD PAGE CHECKS IF USERS ARE MEMBERS.
      // IF THEY AREN'T, /DASHBOARD SENDS THEM TO THE ROOT (/)
      res.redirect("/api/user")
    }
  )

  app.get(
    "/login",
    passport.authenticate("discord", {
      scope: scopes,
      failureRedirect: "/error",
    }),
    async function (req, res) {
      await firebase.auth().signInWithCustomToken(req.user.token)
    }
  )
}
