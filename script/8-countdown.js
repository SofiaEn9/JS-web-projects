const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePicker = document.getElementById("date-picker");

const today = new Date().toISOString().split("T")[0];
datePicker.setAttribute("min", today);
