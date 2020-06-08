const db = require("../utils/db");
const User = require("../models/user");

function deleteDocuments() {
  try {
    db.connect("ourbackyard").then(async () => {
      const count = await User.deleteMany({});
      console.log(`Deleted ${count.deletedCount} records`);
      process.exit();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

deleteDocuments();
