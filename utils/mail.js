const mailUtils = {
  getUserSignupBody: (signupDetails, userType) => {
    if (userType === "business") {
      return `Hi there\r\n
        A new ${userType} just signed up on Ourbackyard.co.za! Here are the details:\n
        Business name: ${signupDetails.businessName}\n
        Business sector: ${signupDetails.businessSector}\n
        About: ${signupDetails.businessAbout}\n
        Business services: ${signupDetails.businessServices}\n
        Business address: ${signupDetails.businessAddress}\n
        Business city: ${signupDetails.businessCity}\n
        Business suburb: ${signupDetails.businessSuburb}\n
        Business postal code: ${signupDetails.businessPostcode}\n
        Business email: ${signupDetails.businessEmail}\n
        Newsletter signup: ${signupDetails.newsletter}\r\n
        --\n
        Kind Regards,\n
        The Ourbackyard Bot`;
    } else {
      return `Hi there\r\n
        A new ${userType} just signed up on Ourbackyard.co.za! Here are the details:\n
        Name: ${signupDetails.userName}\n
        Email address: ${signupDetails.userEmail}\n
        Newsletter signup: ${signupDetails.newsletter}\r\n
        --\n
        Kind Regards,\n
        The Ourbackyard Bot`;
    }
  },
  getConfirmationMailBody: () => {
    return `Hi there!\r\n
        Thank you for your interest in Ourbackyard.co.za!\r\n
        We have received your information and will treat it with the utmost respect for your privacy.\r\n
        As mentioned on our website, we are still hard at work building Ourbackyard, but seeing interest from\n
        people such as yourself is like a warm cup of coffee on a cold winter's morning.\r\n
        If you signed up for our newsletter we will keep you in the loop with all the goings on at\n
        Ourbackyard HQ. If you did not, no worries, simply keep an eye on your inbox for an email from\n
        us as soon as we are ready to go live.\r\n
        --\n
        Kind Regards,\n
        Everyone at Ourbackyard.co.za`;
  },
  getMessageBody: messageDetails => {
    return `Hi there\r\n
        A new message was just sent from Ourbackyard.co.za! Here are the details:\n
        Name: ${messageDetails.name}\n
        Email Address: ${messageDetails.email}\n
        Message: ${messageDetails.message}\r\n
        --\n
        Kind Regards,\n
        The Ourbackyard Bot`;
  },
  getMessageConfirmationBody: () => {
    return `Hi there!\r\n
        Thank you for your interest in Ourbackyard.co.za!\r\n
        We have received your message and will treat it with the utmost respect for your privacy.\r\n
        We personally read all of the messages we receive so, should your message requires a response from us,\n
        we will do our utmost to get back to you as soon as possible.\n
        --\n
        Kind Regards,\n
        Everyone at Ourbackyard.co.za`;
  }
};

module.exports = mailUtils;
