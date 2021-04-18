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
    firstName: user._json.name || user.name.givenName,
    familyName: user.name.familyName || "",
    displayName: user.nickname || user.displayName,
    email: user._json.email,
    emailVerified: user._json.email_verified,
    areaFilter: user.areaFilter,
    authProvider: user.provider,
    role,
  });
};

/**
 * Creates a new business user in the database
 * @param {Object} user - User data received from Auth0
 */
const addBusinessUser = (user) => {
  return User.create({
    userID: user.userID,
    avatar: user.avatar,
    displayName: user.displayName,
    firstName: user.firstName,
    familyName: user.familyName,
    email: user.email,
    emailVerified: user.emailVerified,
    businessName: user.businessName,
    businessWebsite: user.businessWebsite,
    businessAbout: user.businessAbout,
    businessStreetAddress: user.businessStreetAddress,
    businessSuburb: user.businessSuburb,
    businessCity: user.businessCity,
    businessProvince: user.businessProvince,
    businessPostalCode: user.businessPostalCode,
    businessEmail: user.businessEmail,
    authProvider: user.provider,
    role: user.role,
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
 * Get all users with the specified role
 * @param {String} role - the user role
 * @param {Object} [excludes] - record fields to exclude [default: null]
 * @returns All users with the specified role
 */
const findUsersByRole = (role, excludes = null) => {
  return User.find({ role: role }, excludes).exec();
};

/**
 * Searches the database of business users based on search params
 * and returns a Promise
 * @param {Object} searchParams - the search parameters to use for the `find`
 * @returns `Promise` that will resolve with search results
 */
const findUsersBySearchParams = (searchParams) => {
  return User.find({
    $and: [
      {
        $or: [
          {
            businessPostalCode: searchParams.businessPostalCode,
          },
          { areaFilter: searchParams.businessPostalCode },
        ],
      },
      {
        businessAbout: { $regex: searchParams.businessAbout, $options: "gim" },
      },
    ],
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
  addBusinessUser,
  updateUser,
  findUsersByRole,
  findUsersBySearchParams,
  findUserByUserID,
};
