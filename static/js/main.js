(function() {
  ("use strict");
  const ctaContainer = document.getElementById("cta-container");
  const businessUserForm = document.getElementById("business-user-form");
  const residentUserForm = document.getElementById("resident-form");
  const contactForm = document.getElementById("contact-form");

  function hidesignupForms() {
    let signupContainer = document.getElementById("signup-container");
    let signupForms = signupContainer.querySelectorAll("section");

    signupForms.forEach(section => {
      section.classList.add("hidden");
      section.setAttribute("aria-hidden", true);
    });
  }

  if (ctaContainer) {
    ctaContainer.addEventListener("click", event => {
      if (event.target.classList.contains("main-cta")) {
        let sectionSelector = event.target.dataset["section"];
        let section = document.getElementById(sectionSelector);

        hidesignupForms();

        section.classList.remove("hidden");
        section.setAttribute("aria-hidden", false);
      }
    });
  }

  function initAjaxRequest(method, url) {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.timeout = 15000;
    xmlHttpRequest.resposeType = "json";
    return xmlHttpRequest;
  }

  function getAjaxResponse(ajaxRequest) {
    return new Promise((resolve, reject) => {
      ajaxRequest.onreadystatechange = () => {
        if (ajaxRequest.readyState === 4) {
          if (ajaxRequest.status === 200 && ajaxRequest.responseText !== "") {
            resolve(ajaxRequest.responseText);
          } else {
            reject(
              `Ajax error: ${ajaxRequest.status} : ${ajaxRequest.responseText}`
            );
          }
        }
      };
    });
  }

  function getBusinessUserFormData(formData) {
    return JSON.stringify({
      userType: "business",
      businessName: formData.get("business-name"),
      businessAbout: formData.get("business-about"),
      businessAddress: formData.get("business-address"),
      businessEmail: formData.get("business-email"),
      newsletter: formData.get("newsletter")
    });
  }

  function getResidentUserFormData(formData) {
    return JSON.stringify({
      userType: "resident",
      userName: formData.get("username"),
      userEmail: formData.get("useremail"),
      newsletter: formData.get("newsletter")
    });
  }

  /**
   *
   */
  function hideFormErrors() {
    let validationMessages = document.querySelectorAll(".validation-msg");
    for (let i = 0, l = validationMessages.length; i < l; i++) {
      validationMessages[i].classList.add("hidden");
    }
  }

  /**
   *
   * @param {Object} form - The HTMLForm object
   * @param {Object} validationErrors - Form validation errors as an Object
   */
  function setFormErrors(form, validationErrors) {
    let objectKeys = Object.keys(validationErrors.response);
    for (let i = 0, l = objectKeys.length; i < l; i++) {
      let key = objectKeys[i];
      let fieldErrorContainer = form.querySelector(
        `#${key.toLowerCase()}-error`
      );
      fieldErrorContainer.innerText = validationErrors.response[key];
      fieldErrorContainer.classList.remove("hidden");
    }
  }

  /**
   *
   */
  function showThankYouMessage() {
    let thankYouMsg = document.querySelector(".thank-you");
    let signupContainer = document.getElementById("signup-container");

    signupContainer.classList.add("hidden");
    thankYouMsg.classList.remove("hidden");
  }

  if (businessUserForm) {
    businessUserForm.addEventListener("submit", event => {
      event.preventDefault();

      hideFormErrors();

      let ajaxRequest = initAjaxRequest("post", "/signup");
      ajaxRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      ajaxRequest.send(
        new URLSearchParams(new FormData(businessUserForm)).toString()
      );

      getAjaxResponse(ajaxRequest).then(validationSuccess => {
        let parsedResponse = JSON.parse(validationSuccess);

        if (!parsedResponse.accepted.length) {
          setFormErrors(businessUserForm, parsedResponse);
        } else {
          showThankYouMessage();
        }
      });
    });
  }

  if (residentUserForm) {
    residentUserForm.addEventListener("submit", event => {
      event.preventDefault();

      hideFormErrors();

      let ajaxRequest = initAjaxRequest("post", "/signup");
      ajaxRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      ajaxRequest.send(
        new URLSearchParams(new FormData(residentUserForm)).toString()
      );

      getAjaxResponse(ajaxRequest).then(validationSuccess => {
        let parsedResponse = JSON.parse(validationSuccess);

        if (!parsedResponse.accepted.length) {
          setFormErrors(residentUserForm, parsedResponse);
        } else {
          showThankYouMessage();
        }
      });
    });
  }

  /**
   *
   * @param {Object} form - The HTMLForm object
   * @param {Object} validationErrors - Form validation errors as an Object
   */
  function setFormErrorsNew(form, validationErrors) {
    let objectKeys = Object.keys(validationErrors);
    for (let i = 0, l = objectKeys.length; i < l; i++) {
      let key = objectKeys[i];
      let fieldErrorContainer = form.querySelector(
        `#${key.toLowerCase()}-error`
      );
      fieldErrorContainer.innerText = validationErrors[key];
      fieldErrorContainer.classList.remove("hidden");
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      hideFormErrors();

      let ajaxRequest = initAjaxRequest("post", "/contact-us");
      ajaxRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      ajaxRequest.send(
        new URLSearchParams(new FormData(contactForm)).toString()
      );

      getAjaxResponse(ajaxRequest).then(function(response) {
        let responseObj = JSON.parse(response);

        if (responseObj.valid !== undefined && responseObj.valid === false) {
          setFormErrorsNew(contactForm, responseObj.invalidFields);
        } else {
          let thankYouMsg = document.getElementById("thank-you");
          contactForm.classList.add("hidden");
          thankYouMsg.classList.remove("hidden");
        }
      });
    });
  }
})();
