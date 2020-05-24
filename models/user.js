const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    familyName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    businessName: {
      type: String,
    },
    businessWebsite: {
      type: String,
    },
    businessAbout: {
      type: String,
    },
    businessStreetAddress: {
      type: String,
    },
    businessSuburb: {
      type: String,
    },
    businessCity: {
      type: String,
    },
    businessProvince: {
      type: String,
    },
    businessPostalCode: {
      type: String,
    },
    businessEmail: {
      type: String,
    },
    authProvider: {
      type: String,
    },
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
