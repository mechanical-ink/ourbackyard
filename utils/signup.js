const mailUtils = require("./mail");
const sendMail = require("./sendmail");
const validate = require("./validator");

const signup = {
  newSignup: async (userDetails, userType) => {
    let isFieldsValid = true;

    if (userType === "business") {
      isFieldsValid = validate.businessUser({
        businessName: userDetails.businessname,
        businessAbout: userDetails.businessabout,
        businessAddress: userDetails.businessaddress,
        businessEmail: userDetails.businessemail,
        newsletter: userDetails.newsletter
      });
    } else {
      isFieldsValid = validate.residentialUser({
        userName: userDetails.username,
        userEmail: userDetails.useremail,
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
      userDetails.businessemail || userDetails.useremail;
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
