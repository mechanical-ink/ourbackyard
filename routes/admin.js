const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

const dbUtils = require("../utils/db");
const User = require("../models/user");

router.get("/admin/add-user", secured(), (req, res) => {
  res.render("admin/users/add-user");
});

router.post("/admin/add-user", secured(), (req, res) => {
  const reqBody = req.body;
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const newUser = await User.create(reqBody);
        if (newUser) {
          res.render("admin/users/add-user", { success: true });
        }
      } catch (error) {
        console.error(`Error creating user: ${error.toString()}`);
      }
    })
    .catch(error => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

router.get("/admin/view-users", secured(), (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const users = await User.find({}).exec();
        if (users) {
          res.render("admin/users/view-users", { users });
        }
      } catch (error) {
        console.error(`Error creating user: ${error.toString()}`);
      }
    })
    .catch(error => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

router.post("/admin/edit-user", secured(), (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const user = await User.findOne(req.body).exec();
        if (user) {
          res.render("admin/users/edit-user", { user });
        }
      } catch (error) {
        console.error(`Error creating user: ${error.toString()}`);
      }
    })
    .catch(error => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

router.post("/admin/update-user", secured(), (req, res) => {
  console.log(req.body, req.body.email);
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const user = await User.findOneAndUpdate(req.body.email, req.body, {
          new: true,
          useFindAndModify: false
        }).exec();
        if (user) {
          res.render("admin/users/edit-user", { user });
        }
      } catch (error) {
        console.error(`Error creating user: ${error.toString()}`);
      }
    })
    .catch(error => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

router.post("/admin/delete-user", secured(), (req, res) => {
  dbUtils
    .connect("ourbackyard")
    .then(async () => {
      try {
        const user = await User.findOneAndDelete(req.body, {
          useFindAndModify: false
        }).exec();
        if (user) {
          res.redirect("view-users");
        }
      } catch (error) {
        console.error(`Error creating user: ${error.toString()}`);
      }
    })
    .catch(error => {
      console.error(
        `Error while commuincating with database: ${error.toString()}`
      );
    });
});

module.exports = router;
