const express = require("express");
const router = express.Router();

const signup = require("../utils/signup");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/signup", (req, res) => {
  let reqBody = req.body;
  signup.newSignup(reqBody, reqBody.userType).then(response => {
    if (response.accepted.length) {
      res.json(response);
    }
  });
});

module.exports = router;
