// Resources
// https://www.voicerss.org/api/
// https://sv443.net/jokeapi/v2/

const button = document.getElementById("btn");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMeJoke(joke) {
  VoiceRSS.speech({
    key: "c21d1dc1df9344a3b49c36a5f6a3a47a",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMeJoke(joke);
    toggleButton();
  } catch (error) {
    console.log("something went wrong", error);
  }
}

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
