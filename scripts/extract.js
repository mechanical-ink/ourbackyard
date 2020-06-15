const algoliasearch = require("algoliasearch");

const db = require("../utils/db");
const UserAPI = require("../models/user-api");

require("dotenv").config();

const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

function extract() {
  try {
    db.connect("ourbackyard").then(async () => {
      const excludes = {
        _id: 0,
        emailVerified: 0,
        authProvider: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      };
      const businesses = await UserAPI.findUsersByRole("business", excludes);

      const mapped = businesses.map((business) => {
        // Convert mongoose document to plain object
        // https://stackoverflow.com/questions/7503450/how-do-you-turn-a-mongoose-document-into-a-plain-object
        const plainObj = business.toObject();
        plainObj.objectID = plainObj.userID;
        return plainObj;
      });

      index
        .saveObjects(mapped)
        .then(({ objectIDs }) => {
          console.log(objectIDs);
          process.exit();
        })
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

extract();
