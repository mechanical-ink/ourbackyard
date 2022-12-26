const express = require("express");
const router = express.Router();

require("dotenv").config();

const slack = require("slack-notify")(process.env.SLACK_WEBHOOK);

const UserAPI = require("../models/user-api");

router.post("/signup/select-account-type", async (req, res, next) => {
  const user = req.session.user;
  const dbUser = await UserAPI.addUser(user, req.body.role);
  req.session.user = dbUser;
  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }

    const slackMsg = `New user registration: ${dbUser.email} using ${dbUser.authProvider}`;
    slack.success(slackMsg, (error) => {
      if (error) {
        console.error(`==== Slack Notify Error: ${error.toString()} ====`);
      }
    });

    res.redirect("/");
  });
});

module.exports = router;
