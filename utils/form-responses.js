/**
 * An `Object` of form responses that can be passed directly
 * to the response, based on status.
 */
const formResponses = {
  businessUserInvalidFields: fields => {
    const messages = {
      businessName: "The business name field cannot be empty",
      businessAbout: "Please tell us more about your business",
      businessAddress: "The business address field cannot be empty",
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
  },
  contactUsInvalidFields: fields => {
    const messages = {
      name: "Please enter your name",
      email: "Please enter your email address",
      message:
        "The message field is required. Please enter your comment or question."
    };

    let responseMsg = {};

    fields.forEach(field => {
      responseMsg[field] = messages[field];
    });

    return responseMsg;
  }
};

module.exports = formResponses;
