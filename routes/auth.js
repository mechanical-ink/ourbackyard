const express = require("express");
const router = express.Router();
const passport = require("passport");
const util = require("util");
const url = require("url");
const querystring = require("querystring");

const db = require("../utils/db");
const UserAPI = require("../models/user-api");

require("dotenv").config();

// Perform the login, after login Auth0 will redirect to callback
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get("/callback", function (req, res, next) {
  passport.authenticate("auth0", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/login");
    }

    db.connect("ourbackyard")
      .then(async () => {
        const dbUser = await UserAPI.findUserByUserID(user.user_id);

        if (!dbUser) {
          // this is a new user
          // store Auth0 user object in session
          req.session.user = user;
          // redirect to signup index to complete
          // account set-up
          res.redirect("signup/select-account-type");
        } else {
          // existing user
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }

            const returnTo = req.session.returnTo;
            delete req.session.returnTo;

            // store the user as returned from the database
            req.session.user = dbUser;

            res.redirect(returnTo || "/account/");
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get("/logout", (req, res) => {
  req.logout();

  req.session.destroy((error) => {
    if (error) {
      console.error(`Error destroying session: ${error.toString()}`);
    }

    let returnTo = `${req.protocol}://${req.hostname}`;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += ":" + port;
    }

    const logoutURL = new url.URL(
      util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
    );
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo,
    });

    logoutURL.search = searchString;
    res.redirect(logoutURL);
  });
});

module.exports = router;
