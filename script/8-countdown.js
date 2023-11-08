const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePicker = document.getElementById("date-picker");
const countdownContainer = document.getElementById("countdown");
const countdownElementTitle = document.getElementById("countdown-title");
const timeElements = document.querySelectorAll("span");
const countdownBtn = document.getElementById("submit-btn");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const sec = 1000;
const min = sec * 60;
const hr = min * 60;
const day = hr * 24;

// Add a min range to date picker
const today = new Date().toISOString().split("T")[0];
datePicker.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log("distance:", distance);
    const days = Math.floor(distance / day);
    const hrs = Math.floor((distance % day) / hr);
    const mins = Math.floor((distance % hr) / min);
    const secs = Math.floor((distance % min) / sec);
    console.log(days, hrs, mins, secs);
    // Hide Input Container
    inputContainer.hidden = true;
    // Show Countdown Container
    countdownContainer.hidden = false;
    // Populate Countdown
    countdownElementTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hrs}`;
    timeElements[2].textContent = `${mins}`;
    timeElements[3].textContent = `${secs}`;
  }, sec);
}

function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
  // Check for valid date
  if (countdownDate === "") {
    alert("Please select a valid date");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    console.log(countdownValue);
    updateDOM();
  }
}

function resetCoutdown() {
  // Show Input Container / Hide Countdown
  countdownContainer.hidden = true;
  inputContainer.hidden = false;
  // Stop Countdown
  clearInterval(countdownActive);
  // Reset Countdown values
  countdownTitle = "";
  countdownDate = "";
}

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", resetCoutdown);
