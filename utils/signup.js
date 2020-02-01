const mailUtils = require("./mail");
const sendMail = require("./sendmail");
const validate = require("./validator");

const signup = {
  newSignup: async (userDetails, userType) => {
    let isFieldsValid = true;

    if (userType === "business") {
      isFieldsValid = validate.businessUser({
        businessName: userDetails.businessName,
        businessAbout: userDetails.businessAbout,
        businessAddress: userDetails.businessAddress,
        businessEmail: userDetails.businessEmail,
        newsletter: userDetails.newsletter
      });
    } else {
      isFieldsValid = validate.residentialUser({
        userName: userDetails.userName,
        userEmail: userDetails.userEmail,
        newsletter: userDetails.newsletter
      });
    }

    if (!isFieldsValid) {
      return {
        formValid: false,
        invalidFields: isFieldsValid
      };
    }

    let confirmationToEmail =
      userDetails.businessEmail || userDetails.userEmail;
    let mailBody = mailUtils.getUserSignupBody(userDetails, userType);
    let mailResponse = await sendMail.newSignup(mailBody);

    if (mailResponse.accepted.length) {
      let confirmation = await sendMail.confirmation(
        mailUtils.getConfirmationMailBody(),
        confirmationToEmail
      );
      return confirmation;
    }
  }
};

module.exports = signup;
