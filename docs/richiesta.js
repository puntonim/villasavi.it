const onDocumentReadyRichiesta = () => {
  const richiestForm = new RichiestaForm();
  richiestForm.onFormSubmitButtonClick();
  richiestForm.onFormFieldsChange();
};
document.addEventListener("DOMContentLoaded", onDocumentReadyRichiesta);

class RichiestaForm {
  constructor() {
    // Fields.
    this.firstnameField = document.querySelector("#data-firstname");
    this.lastnameField = document.querySelector("#data-lastname");
    this.phoneField = document.querySelector("#data-phone");
    this.emailField = document.querySelector("#data-email");
    this.messageField = document.querySelector("#data-message");
    this.consentField = document.querySelector("#data-consent");
    // Labels.
    this.firstnameLabel = document.querySelector("label[for=data-firstname]");
    this.lastnameLabel = document.querySelector("label[for=data-lastname]");
    this.phoneLabel = document.querySelector("label[for=data-phone]");
    this.emailLabel = document.querySelector("label[for=data-email]");
    this.messageLabel = document.querySelector("label[for=data-message]");
    this.consentLabel = document.querySelector("label[for=data-consent]");
    // Errors.
    this.firstnameError = document.querySelector(".data-firstname-error");
    this.lastnameError = document.querySelector(".data-lastname-error");
    this.phoneError = document.querySelector(".data-phone-error");
    this.emailError = document.querySelector(".data-email-error");
    this.messageError = document.querySelector(".data-message-error");
    this.consentError = document.querySelector(".data-consent-error");
    // Submit button.
    this.submitButton = document.querySelector(".button-submit-nim");
  }

  onFormSubmitButtonClick() {
    this.submitButton.onclick = async () => {
      const formData = this._getData();

      const hasMissing = this._checkMissingRequiredData(formData);
      const hasError = this._validateData(formData);

      if (hasMissing || hasError) return;

      this._disableSubmitButton();

      try {
        await this._submitData(formData);
      } catch (e) {
        console.log(e.name + ": " + e.message); //Eg: Error: Unavailable!
        this._showSubmitError();
        return;
      }
      this._showSubmitSuccess();
    };
  }

  onFormFieldsChange() {
    const fieldsWithPossibleErrors = [
      "firstname",
      "lastname",
      "phone",
      "email",
      "message",
      "consent",
    ];
    for (let fieldName of fieldsWithPossibleErrors) {
      this[fieldName + "Field"].oninput = () => {
        this._hideFieldError(fieldName);
      };
    }
  }

  _getData() {
    const data = {
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      message: null,
      consent: null,
    };
    data.firstname = this.firstnameField.value.trim();
    data.lastname = this.lastnameField.value.trim();
    data.phone = this.phoneField.value.trim();
    data.email = this.emailField.value.trim();
    data.message = this.messageField.value.trim();
    data.consent = this.consentField.checked;
    return data;
  }

  _checkMissingRequiredData(data) {
    let hasMissing = false;
    const requiredFields = ["firstname", "lastname", "message"];
    for (let requiredField of requiredFields) {
      if (!data[requiredField]) {
        this._showFieldError(requiredField);
        hasMissing = true;
      }
    }

    // At least one between phone and email is required.
    if (!data.phone && !data.email) {
      this._showFieldError("phone");
      this._showFieldError("email");
      hasMissing = true;
    }
    return hasMissing;
  }

  _validateData(data) {
    let hasError = false;

    // Validate phone.
    if (data.phone && !this._isValidPhone(data.phone)) {
      this._showFieldError("phone", true);
      hasError = true;
    }

    // Validate email.
    if (data.email && !this._isValidEmail(data.email)) {
      this._showFieldError("email", true);
      hasError = true;
    }

    // Validate consent.
    if (!data.consent) {
      this._showFieldError("consent", true);
      hasError = true;
    }

    return hasError;
  }

  _isValidPhone(value) {
    let digits = value;
    if (value.startsWith("+")) digits = value.slice(1);

    let counter = 0;
    for (let digit of digits) {
      if (digit === " ") continue;
      else if (this._isDigit(digit)) counter++;
      else return false;
    }

    if (counter < 9) return false;
    return true;
  }

  _isDigit(char) {
    return char >= "0" && char <= "9";
  }

  _isValidEmail(value) {
    // Src: https://stackoverflow.com/a/46181/1969672
    return value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  async _submitData(data) {
    console.log("New richiesta submitted");
    console.log(JSON.stringify(data));

    // Debug.
    if (data.message === "error") throw new Error("Simulating an error");

    const api = new BackendApi();
    await api.getOnlineRequest(data);
  }

  _showFieldError(fieldName, doShowError = false) {
    if (fieldName !== "consent")
      this[fieldName + "Label"].classList.add("form-label-error");
    this[fieldName + "Field"].classList.add("form-field-error");
    if (doShowError) {
      this[fieldName + "Error"].classList.remove("display-none");
    }
  }

  _hideFieldError(fieldName) {
    this[fieldName + "Label"].classList.remove("form-label-error");
    this[fieldName + "Field"].classList.remove("form-field-error");
    this[fieldName + "Error"].classList.add("display-none");
  }

  _showSubmitError() {
    document
      .querySelector(".submit-error-nim")
      .classList.remove("display-none");
  }

  _showSubmitSuccess() {
    document.querySelector(".form-container-nim").classList.add("display-none");
    document
      .querySelector(".button-submit-container-nim")
      .classList.add("display-none");
    document
      .querySelector(".submit-success-nim")
      .classList.remove("display-none");
  }

  _disableSubmitButton() {
    const button = document.querySelector(".button-submit-nim");
    button.classList.add("button-disabled");
    button.querySelector(".spinner").classList.remove("display-none");
    button.querySelector("span").classList.add("display-none");
    button.querySelector(".icon-more").classList.add("display-none");
    button;
  }
}
