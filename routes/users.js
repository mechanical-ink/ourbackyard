const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/account/user", secured(), function (req, res, next) {
  res.render("account/user", {
    title: "Profile page",
  });
});

module.exports = router;
