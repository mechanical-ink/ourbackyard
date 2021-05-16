const express = require("express");
const router = express.Router();

const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const dbUtils = require("../utils/db");
const { findUserByUserID } = require("../models/user-api");

router.get("/profile/:userID", (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const user = await findUserByUserID(req.params.userID);
        res.render("profile/index", { user });
      } catch (error) {
        rollbar.error(error, req);
        console.error(
          `Error while getting user details from database: ${error.toString()}`
        );
      }
    })
    .catch((error) => {
      rollbar.error(error, req);
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

module.exports = router;
