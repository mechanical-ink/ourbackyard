(function() {
  ("use strict");
  const contactForm = document.getElementById("contact-form");

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
