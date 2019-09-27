const nodemailer = require("nodemailer");

require("dotenv").config();

const smtpConfig = {
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
const transporter = nodemailer.createTransport(smtpConfig);

const sendMail = {
  newSignup: async mailBody => {
    let mailOptions = {
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
      replyTo: process.env.MAIL_REPLYTO,
      cc: process.env.MAIL_CC,
      subject: process.env.MAIL_SUBJECT,
      text: mailBody
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  },
  confirmation: async (mailBody, userEmail) => {
    let mailOptions = {
      to: userEmail,
      from: process.env.MAIL_FROM,
      replyTo: process.env.MAIL_REPLYTO,
      subject: process.env.MAIL_SUBJECT_CONFIRMATION,
      text: mailBody
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  }
};

module.exports = sendMail;
