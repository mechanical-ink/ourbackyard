const faker = require("faker");

const db = require("../utils/db");
const UserAPI = require("../models/user-api");

const postalCodes = ["0181", "0182", "0183", "0184", "0185"];

/*
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

function getFakeIndividualUser() {
  return {
    user_id: faker.datatype.uuid(),
    picture: faker.image.imageUrl(),
    _json: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      email_verified: true,
    },
    name: {
      familyName: faker.name.lastName(),
    },
    displayName: faker.internet.userName(),
    areaFilter: postalCodes[getRandomInt(0, 5)],
    provider: "google",
  };
}

function getFakeBusinessUser() {
  return {
    userID: faker.datatype.uuid(),
    avatar: "https://placekitten.com/g/300/300",
    displayName: faker.company.companyName(),
    firstName: faker.name.firstName(),
    familyName: faker.name.lastName(),
    email: faker.internet.email(),
    emailVerified: "true",
    businessName: faker.company.companyName(),
    businessWebsite: faker.internet.url(),
    businessAbout: faker.lorem.paragraph(),
    businessStreetAddress: faker.address.streetAddress(),
    businessSuburb: faker.address.secondaryAddress(),
    businessCity: faker.address.city(),
    businessProvince: faker.address.state(),
    businessPostalCode: postalCodes[getRandomInt(0, 5)],
    businessEmail: faker.internet.email(),
    provider: "google",
    role: "business",
  };
}

function populate() {
  try {
    db.connect("ourbackyard").then(async () => {
      for (let i = 0; i < 20; i++) {
        await UserAPI.addUser(getFakeIndividualUser(), "individual");
      }

      for (let i = 0; i < 20; i++) {
        await UserAPI.addBusinessUser(getFakeBusinessUser());
      }

      process.exit();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

populate();
