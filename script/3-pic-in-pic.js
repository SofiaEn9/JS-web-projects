const videoElement = document.getElementById("video");
const button = document.getElementById("btn");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("an error has been detected:", error);
  }
}

button.addEventListener("click", async () => {
  // disable button
  button.disabeled = true;
  // start picture in picture
  await videoElement.requestPictureInPicture();
  // rest button
  button.disabeled = false;
});

selectMediaStream();
