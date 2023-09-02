const nameInput = document.getElementById("cardholder-name");
const nameClient = document.querySelector(".card__details-name");

const cardNumberInput = document.getElementById("card-number");
const cardNumber = document.querySelector(".card__numbers");

const codeInput = document.getElementById("cvc");
const code = document.querySelector(".back_card span");

const monthInput = document.getElementById("exp-date-mm");
const month = document.querySelector(".card__month");

const yearInput = document.getElementById("exp-date-yy");
const year = document.querySelector(".card__year");

const btnConfirm = document.getElementById("btn-confirm");
const btnContinue = document.getElementById("btn-continue");

let thanksSection = document.querySelector(".main-container__thanks-section");
let formSection = document.querySelector(".main-container__form-section");

let wrongFormatDiv;
let validationName = false;
let validationCardNumber = false;
let validationCVC = false;
let validationMonth = false;
let validationYear = false;

/*=====================================================EVENT LISTENERS============================================================*/
nameInput.addEventListener("input", validateNames);
cardNumberInput.addEventListener("input", validateCardNumber);
monthInput.addEventListener("input", validateMonth);
yearInput.addEventListener("input", validateYear);
codeInput.addEventListener("input", validateCVC);




//BUTTONS
btnConfirm.addEventListener("click", (e) => {
  e.preventDefault();

  if (!checkIfFilled(nameInput, nameInput.nextElementSibling))
    validationName = false;

  if (!checkIfFilled(cardNumberInput, cardNumberInput.nextElementSibling)) {
    validationCardNumber = false;
  } else {
    if (cardNumberInput.value.length != 16) {
      showError(
        cardNumberInput,
        cardNumberInput.nextElementSibling,
        "Card number has to be 16 numbers"
      );
      validationCardNumber = false;
    }
  }

  if (!checkIfFilled(monthInput, monthInput.nextElementSibling)) {
    validationMonth = false;
  } else {
    if (monthInput.value.length != 2) {
      showError(monthInput, monthInput.nextElementSibling, "Invalid Month");
      validationMonth = false;
    }
  }

  if (!checkIfFilled(yearInput, yearInput.nextElementSibling)) {
    validationYear = false;
  } else {
    if (yearInput.value.length != 2) {
      showError(yearInput, yearInput.nextElementSibling, "Invalid Year");
      validationYear = false;
    }
  }

  if (!checkIfFilled(codeInput, codeInput.nextElementSibling)) {
    validationCVC = false;
  } else {
    if (codeInput.value.length != 3) {
      showError(codeInput, codeInput.nextElementSibling, "Invalid CVC");
      validationCVC = false;
    }
  }

  if (
    validationName &&
    validationCardNumber &&
    validationCVC &&
    validationMonth &&
    validationYear
  ) {
    formSection.style.display = "none";
    thanksSection.style.display = "flex";
  }
});

/*=====================================================FUNCTIONS============================================================*/
//CARDHOLDER'S NAMES
function validateNames() {
  wrongFormatDiv = document.querySelector(".wrong-format__cardholder-name");

  if (nameInput.value == "") {
    nameClient.textContent = "Jane Appleseed";
  } else {
    nameClient.textContent = nameInput.value;

    checkLetters(nameInput, wrongFormatDiv)
      ? (validationName = true)
      : (validationName = false);
  }
}
//CARD NUMBER
function validateCardNumber() {
  wrongFormatDiv = document.querySelector(".wrong-format__card-number");

  if (cardNumberInput.value == "") {
    cardNumber.textContent = "0000 0000 0000 0000";
    hideError(cardNumberInput, wrongFormatDiv);
  } else {
    // Process of separating the card number into groups of 4 numbers
    let pattern = /.{1,4}/g; // The n{X,Y} quantifier matches any string that contains a sequence of X to Y n's.
    let separation = cardNumberInput.value.match(pattern); // Will separate the e.target.value every 4 numbers. Returns array

    cardNumber.textContent = separation.join(" "); // Will join with " " every element of the array separation

    checkNumbers(cardNumberInput, wrongFormatDiv)
      ? (validationCardNumber = true)
      : (validationCardNumber = false);
  }
}
//MONTH
function validateMonth() {
  wrongFormatDiv = document.querySelector(".wrong-format__exp-date-mm");

  if (monthInput.value == "") {
    month.textContent = "MM";
    hideError(monthInput, wrongFormatDiv);
  } else {
    month.textContent = monthInput.value;

    if (checkNumbers(monthInput, wrongFormatDiv)) {
      if (
        monthInput.value.length == 2 &&
        parseInt(monthInput.value) >= 1 &&
        parseInt(monthInput.value) <= 12
      ) {
        hideError(monthInput, wrongFormatDiv);
        validationMonth = true;
      } else {
        showError(monthInput, wrongFormatDiv, "Invalid month");
        validationMonth = false;
      }
    } else validationMonth = false;
  }
}
//YEAR
function validateYear() {
  wrongFormatDiv = document.querySelector(".wrong-format__exp-date-yy");

  if (yearInput.value == "") {
    year.textContent = "MM";
    hideError(yearInput, wrongFormatDiv);
  } else {
    year.textContent = yearInput.value;

    if (checkNumbers(yearInput, wrongFormatDiv)) {
      if (
        yearInput.value.length == 2 &&
        parseInt(yearInput.value) >= 1 &&
        parseInt(yearInput.value) <= 22
      ) {
        hideError(yearInput, wrongFormatDiv);
        validationYear = true;
      } else {
        showError(yearInput, wrongFormatDiv, "Invalid year");
        validationYear = false;
      }
    } else validationYear = false;
  }
}
//CVC
function validateCVC() {
  wrongFormatDiv = document.querySelector(".wrong-format__cvc");

  if (codeInput.value == "") {
    code.textContent = "CVC";
    hideError(codeInput, wrongFormatDiv);
  } else {
    code.textContent = codeInput.value;

    checkNumbers(codeInput, wrongFormatDiv)
      ? (validationCVC = true)
      : (validationCVC = false);
  }
}

function checkIfFilled(input, errorDiv) {
  if (input.value.length > 0) {
    return true;
  } else {
    showError(input, errorDiv, "Can't be blank");
    return false;
  }
}

function checkLetters(input, errorDiv) {
  let namePattern = /^[a-zA-Z ]+$/;

  if (namePattern.test(input.value)) {
    hideError(input, errorDiv);
    return true;
  } else {
    showError(input, errorDiv, "Wrong format, letters only.");
    return false;
  }
}

function checkNumbers(input, errorDiv) {
  let numberPattern = /^[0-9]+$/;

  if (numberPattern.test(input.value)) {
    hideError(input, errorDiv);
    return true;
  } else {
    showError(input, errorDiv, "Wrong format, numbers only.");
    return false;
  }
}

function showError(input, errorDiv, errorMsg) {
  input.style.borderColor = "var(--red)";
  errorDiv.textContent = errorMsg;
}

function hideError(input, errorDiv) {
  input.style.borderColor = "var(--light-grayish-violet)";
  errorDiv.textContent = "";
}
