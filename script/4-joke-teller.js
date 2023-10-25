const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function test() {
  VoiceRSS.speech({
    key: "c21d1dc1df9344a3b49c36a5f6a3a47a",
    src: "Hello, world!",
    hl: "en-us",
    // v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

test();
