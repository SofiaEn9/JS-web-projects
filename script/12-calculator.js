const inputBtns = document.querySelectorAll("button");
const calculatorDisplay = document.querySelector("h1");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // if there is no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitingNextValue) return;
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset Display
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

clearBtn.addEventListener("click", resetAll);
