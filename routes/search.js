const express = require("express");
const router = express.Router();

const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const dbUtils = require("../utils/db");
const { findUsersBySearchParams } = require("../models/user-api");

router.get("/search", (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      console.log("connected to database");
      try {
        const searchParams = {
          businessPostalCode: req.query.postalcode,
          businessAbout: req.query.query,
          role: "business",
        };

        const searchResults = await findUsersBySearchParams(searchParams);

        res.render("search-results", { searchResults });
      } catch (error) {
        rollbar.error(error, req);
        console.error(`Error while searching database: ${error.toString()}`);
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
