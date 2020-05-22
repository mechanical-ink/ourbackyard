const express = require("express");
const router = express.Router();

const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const contact = require("../utils/contact");
const signup = require("../utils/signup");
const validate = require("../utils/validator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/thank-you", (req, res) => {
  res.render("thank-you");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/privacy", (req, res) => {
  res.render("policies/privacy");
});

router.get("/terms", (req, res) => {
  res.render("policies/terms");
});

router.get("/cookie-policy", (req, res) => {
  res.render("policies/cookie-policy");
});

router.post("/contact-us", (req, res) => {
  const reqBody = req.body;
  const validationResult = validate.contactUs(reqBody);

  if (!validationResult.valid) {
    res.json(validationResult);
    return;
  }

  contact.sendMessage(reqBody).then((response) => {
    if (response.accepted.length) {
      res.json(response);
    }
  });
});

router.post("/signup", (req, res) => {
  const reqBody = req.body;
  signup
    .newSignup(reqBody, reqBody.usertype)
    .then((response) => {
      if (response.accepted.length) {
        res.json(response);
      }
    })
    .catch((error) => {
      rollbar.error(error, req);
      console.error(`Signup error: ${error.toString()}`);
    });
});

module.exports = router;
