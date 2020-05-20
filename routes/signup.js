const express = require("express");
const router = express.Router();

const UserAPI = require("../models/user-api");

router.get("/signup/select-account-type", async (req, res) => {
  res.render("signup/index");
});

router.post("/signup/select-account-type", async (req, res, next) => {
  const user = req.session.user;
  const dbUser = await UserAPI.addUser(user, req.body.role);
  req.session.user = dbUser;
  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

module.exports = router;
