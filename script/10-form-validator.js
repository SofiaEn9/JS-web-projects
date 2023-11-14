const form = document.getElementById("form");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordMatch = false;

function validateForm() {
  // Use HTML constraint API to check form validity
  isValid = form.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    message.textContent = "Please fill out all fields";
    message.style.color = "red";
    messageContainer.style.border = "red";
    return;
  }
  // Check to see if both password fields match
  if (password1.value === password2.value) {
    passwordMatch = true;
    password1.style.borderColor = "green";
    password2.style.borderColor = "green";
  } else {
    passwordMatch = false;
    message.textContent = "Make sure passwords match";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    password1.style.borderColor = "red";
    password2.style.borderColor = "red";
    return;
  }
  // If form is valid and passwords match
  if (isValid && passwordMatch) {
    message.textContent = "Successfully registered!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
  // message.style.color = "#c61529";
  // messageContainer.style.border = "#c61529";
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  // Do something with user data
  console.log(user);
}

function processFormData(event) {
  event.preventDefault();
  validateForm();
  // Submit Form if Valid
  if (isValid && passwordMatch) {
    storeFormData();
  }
}

form.addEventListener("submit", processFormData);
