const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

const dbUtils = require("../utils/db");
const UserAPI = require("../models/user-api");

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
