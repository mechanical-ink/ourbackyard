const formResponses = require("./form-responses");

const validator = {
  businessUser: formData => {
    let invalidFields = [];
    let valid = true;

    if (formData.businessName.trim() === "") {
      invalidFields.push("businessName");
      valid = false;
    }

    if (formData.businessSector.trim() === "") {
      invalidFields.push("businessSector");
      valid = false;
    }

    if (formData.businessAbout.trim() === "") {
      invalidFields.push("businessAbout");
      valid = false;
    }

    if (formData.businessServices.trim() === "") {
      invalidFields.push("businessServices");
      valid = false;
    }

    if (formData.businessAddress.trim() === "") {
      invalidFields.push("businessAddress");
      valid = false;
    }

    if (formData.businessCity.trim() === "") {
      invalidFields.push("businessCity");
      valid = false;
    }

    if (formData.businessSuburb.trim() === "") {
      invalidFields.push("businessSuburb");
      valid = false;
    }

    if (
      formData.businessPostcode.trim() === "" ||
      isNaN(formData.businessPostcode)
    ) {
      invalidFields.push("businessPostcode");
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
  }
};

module.exports = validator;
