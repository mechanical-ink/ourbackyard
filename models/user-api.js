const User = require("./user");

/**
 * Creates a new user in the database
 * @param {Object} user - User data received from Auth0
 * @param {String} role - The user's selected or assigned role
 */
const addUser = (user, role) => {
  return User.create({
    userID: user.user_id,
    avatar: user.picture,
    displayName: user.nickname,
    email: user._json.email,
    emailVerified: false,
    authProvider: user.provider,
    role
  });
};

/**
 * Find user by user_id field
 * This is the ID returned by Auth0
 * @param {String} userID - The user id
 */
const findUserByUserID = userID => {
  return User.find({ userID: userID }).exec();
};

module.exports = {
  addUser,
  findUserByUserID
};
