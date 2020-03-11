const mongoose = require("mongoose");

require("dotenv").config();

/**
 * Utils for working with MongoDB
 */
const dbUtils = {
  connect: dbName => {
    const DBHOST = process.env.DB_HOST;
    const DBPROTOCOL = process.env.DB_PROROCOL;
    const USERNAME = process.env.DB_USER;
    const PASSWORD = process.env.DB_PASS;
    const MONGOURI = `${DBPROTOCOL}://${USERNAME}:${PASSWORD}@${DBHOST}/${dbName}?retryWrites=true&w=majority`;

    return mongoose.connect(MONGOURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};

module.exports = dbUtils;
