const mailUtils = require("./mail");
const sendMail = require("./sendmail");

const contact = {
  sendMessage: async messageBody => {
    const confirmationToEmail = messageBody.email;
    const mailMessage = mailUtils.getMessageBody(messageBody);

    const mailResponse = await sendMail.message(mailMessage);

    if (mailResponse.accepted.length) {
      let confirmation = await sendMail.confirmation(
        mailUtils.getMessageConfirmationBody(),
        confirmationToEmail
      );
      return confirmation;
    }
  }
};

module.exports = contact;
