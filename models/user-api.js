const User = require("./user");

/**
 * Creates a new user in the database
 * @param {Object} user - User data received from Auth0
 * @param {String} role - The user's selected or assigned role
 */
const addUser = (user, role) => {
  console.log(user);
  return User.create({
    userID: user.user_id,
    avatar: user.picture,
    firstName: user._json.name || user.name.givenName,
    familyName: user.name.familyName || "",
    displayName: user.nickname || user.displayName,
    email: user._json.email,
    emailVerified: user._json.email_verified,
    authProvider: user.provider,
    role,
  });
};

/**
 *
 * @param {Object} userDetail - New user information submitted from UI
 */
const updateUser = (userDetail) => {
  return User.findOneAndUpdate({ userID: userDetail.userID }, userDetail, {
    new: true,
    useFindAndModify: false,
  }).exec();
};

/**
 * Find user by user_id field
 * This is the ID returned by Auth0
 * @param {String} userID - The user id
 */
const findUserByUserID = (userID) => {
  return User.findOne({ userID: userID }).exec();
};

module.exports = {
  addUser,
  updateUser,
  findUserByUserID,
};
