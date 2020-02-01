const formResponses = require("./form-responses");

const validator = {
  businessUser: formData => {
    let invalidFields = [];
    let valid = true;

    if (formData.businessName.trim() === "") {
      invalidFields.push("businessName");
      valid = false;
    }

    if (formData.businessAbout.trim() === "") {
      invalidFields.push("businessAbout");
      valid = false;
    }

    if (formData.businessAddress.trim() === "") {
      invalidFields.push("businessAddress");
      valid = false;
    }

    if (formData.businessEmail.trim() === "") {
      invalidFields.push("businessEmail");
      valid = false;
    }

    if (!valid) {
      return formResponses.businessUserInvalidFields(invalidFields);
    } else {
      return true;
    }
  },
  residentialUser: formData => {
    let invalidFields = [];
    let valid = true;

    if (formData.userName.trim() === "") {
      invalidFields.push("userName");
      valid = false;
    }

    if (formData.userEmail.trim() === "") {
      invalidFields.push("userEmail");
      valid = false;
    }

    if (!valid) {
      return formResponses.residentUserInvalidFields(invalidFields);
    } else {
      return true;
    }
  },
  contactUs: formData => {
    let invalidFields = [];
    let valid = true;

    Object.keys(formData).forEach(entry => {
      if (formData[entry].trim() === "") {
        invalidFields.push(entry);
        valid = false;
      }
    });

    return {
      valid,
      invalidFields: invalidFields.length
        ? formResponses.contactUsInvalidFields(invalidFields)
        : []
    };
  }
};

module.exports = validator;
