(function() {
  "use strict";
  const ctaContainer = document.getElementById("cta-container");
  const businessUserForm = document.getElementById("business-user-form");
  const residentUserForm = document.getElementById("resident-form");

  function hidesignupForms() {
    let signupContainer = document.getElementById("signup-container");
    let signupForms = signupContainer.querySelectorAll("section");

    signupForms.forEach(section => {
      section.classList.add("hidden");
      section.setAttribute("aria-hidden", true);
    });
  }

  ctaContainer.addEventListener("click", event => {
    if (event.target.classList.contains("main-cta")) {
      let sectionSelector = event.target.dataset["section"];
      let section = document.getElementById(sectionSelector);

      hidesignupForms();

      section.classList.remove("hidden");
      section.setAttribute("aria-hidden", false);
    }
  });

  function initAjaxRequest(method, url) {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.setRequestHeader("Content-type", "application/json");
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
      businessSector: formData.get("business-sector"),
      businessAbout: formData.get("business-about"),
      businessServices: formData.get("business-services"),
      businessAddress: formData.get("business-address"),
      businessCity: formData.get("business-city"),
      businessSuburb: formData.get("business-suburb"),
      businessPostcode: formData.get("business-postcode"),
      businessEmail: formData.get("business-email"),
      newsletter: formData.get("newsletter")
    });
  }

  function getResidentUserFormData(formData) {
    return JSON.stringify({
      userType: "resident",
      userName: formData.get("user-name"),
      userEmail: formData.get("user-email"),
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

  businessUserForm.addEventListener("submit", event => {
    event.preventDefault();

    hideFormErrors();

    let formData = getBusinessUserFormData(new FormData(businessUserForm));
    let ajaxRequest = initAjaxRequest("post", "/signup");
    ajaxRequest.send(formData);

    getAjaxResponse(ajaxRequest).then(validationSuccess => {
      let parsedResponse = JSON.parse(validationSuccess);

      if (!parsedResponse.accepted.length) {
        setFormErrors(businessUserForm, parsedResponse);
      } else {
        showThankYouMessage();
      }
    });
  });

  residentUserForm.addEventListener("submit", event => {
    event.preventDefault();

    hideFormErrors();

    let formData = getResidentUserFormData(new FormData(residentUserForm));
    let ajaxRequest = initAjaxRequest("post", "/signup");
    ajaxRequest.send(formData);

    getAjaxResponse(ajaxRequest).then(validationSuccess => {
      let parsedResponse = JSON.parse(validationSuccess);

      if (!parsedResponse.accepted.length) {
        setFormErrors(residentUserForm, parsedResponse);
      } else {
        showThankYouMessage();
      }
    });
  });
})();
