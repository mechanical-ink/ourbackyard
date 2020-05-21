const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

const dbUtils = require("../utils/db");
const UserAPI = require("../models/user-api");

/* GET user profile */
router.get("/account/", secured(), (req, res, next) => {
  res.render("account/user", {
    title: "Profile page",
  });
});

/* GET user profile edit */
router.get("/account/edit", secured(), (req, res, next) => {
  res.render("account/edit", {
    title: "Edit Profile",
  });
});

router.post("/account/update", secured(), (req, res, next) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const user = await UserAPI.updateUser(req.body);

        if (user) {
          req.session.user = user;
          res.redirect("/account/edit");
        }
      } catch (error) {
        console.error(`Error updating user: ${error.toString()}`);
      }
    })
    .catch((error) => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

module.exports = router;
