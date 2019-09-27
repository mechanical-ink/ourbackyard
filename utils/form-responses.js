/**
 * An `Object` of form responses that can be passed directly
 * to the response, based on status.
 */
const formResponses = {
  businessUserInvalidFields: fields => {
    const messages = {
      businessName: "The business name field cannot be empty",
      businessSector: "The business sector field cannot be empty",
      businessAbout: "Please tell us more about your business",
      businessServices: "The business services field cannot be empty",
      businessAddress: "The business address field cannot be empty",
      businessCity: "The city field cannot be empty",
      businessSuburb: "The suburb field cannot be empty",
      businessPostcode:
        "The postal code should only contain numbers and cannot be empty",
      businessEmail:
        "Please provide us with an email address. Your email address will never be shared"
    };
    let responseMsg = {};

    fields.forEach(field => {
      responseMsg[field] = messages[field];
    });

    return responseMsg;
  },
  residentUserInvalidFields: fields => {
    const messages = {
      userName: "The name field cannot be empty",
      userEmail:
        "Please provide us with an email address. Your email address will never be shared"
    };

    let responseMsg = {};

    fields.forEach(field => {
      responseMsg[field] = messages[field];
    });

    return responseMsg;
  }
};

module.exports = formResponses;
