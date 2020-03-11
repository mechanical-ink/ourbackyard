const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/account/user", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("account/user", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Profile page"
  });
});

module.exports = router;
