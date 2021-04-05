const express = require("express");
const router = express.Router();

const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const dbUtils = require("../utils/db");

router.get("/search", (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        res.render("search-results");
      } catch (err) {}
    })
    .catch((error) => {
      rollbar.error(error, req);
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

module.exports = router;
