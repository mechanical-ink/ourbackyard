const express = require("express");
const router = express.Router();

const contact = require("../utils/contact");
const signup = require("../utils/signup");
const validate = require("../utils/validator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/contact-us", (req, res) => {
  let reqBody = req.body;
  let validationResult = validate.contactUs(reqBody);

  if (!validationResult.valid) {
    res.json(validationResult);
    return;
  }

  contact.sendMessage(reqBody).then(response => {
    if (response.accepted.length) {
      res.json(response);
    }
  });
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
