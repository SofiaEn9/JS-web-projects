const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x-btn");
const newQuoteBtn = document.getElementById("new-quote-btn");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loading Spinner Hidden
function completeLoad() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show a new quote
function newQuote() {
  loading();
  //pick random quote from apiQutoe array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "-Unknown";
  } else {
    authorText.textContent = `-${quote.author}`;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = `${quote.text}`;
  completeLoad();
}

async function getQuote() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
xBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On load
getQuote();
