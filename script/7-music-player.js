let title = document.querySelector("#songTitle");
let artist = document.querySelector("#artist");
let image = document.querySelector("img");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const fwdBtn = document.getElementById("fwd");

// Check if playing
let isPlaying = false;

let songIndex = 0;

// List of songs
let songs = [
  {
    name: "7-Autumn",
    displayName: "The Four Seasons - Autumn",
    artist: "Antonio Vivaldi",
  },
  {
    name: "7-FluteDePan",
    displayName: "Flute De Pan 2",
    artist: "Jules Mouquet",
  },
  {
    name: "7-Moonlight",
    displayName: "Moonlight Sonata",
    artist: "Beethoven",
  },
  {
    name: "7-Waltz",
    displayName: "Waltz in B minor",
    artist: "Frederic Chopin",
  },
  {
    name: "7-Winter",
    displayName: "The Four Seasons - Winter",
    artist: "Antonio Vivaldi",
  },
];

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = `media/${song.name}.jpg`;
  music.src = `media/${song.name}.mp3`;
}

function forwardSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
fwdBtn.addEventListener("click", forwardSong);
prevBtn.addEventListener("click", prevSong);
