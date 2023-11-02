let title = document.querySelector("#songTitle");
let artist = document.querySelector("#artist");
let image = document.querySelector("img");
let progressBar = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const durationElement = document.getElementById("duration");
const currentTimeElement = document.getElementById("current-time");
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

function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    // Display song duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching the duration element to avoid displaying NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Display song current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
fwdBtn.addEventListener("click", forwardSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", forwardSong);
progressContainer.addEventListener("click", setProgressBar);
