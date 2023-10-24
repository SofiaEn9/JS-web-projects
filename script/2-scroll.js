const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photoArray = [];

// Unsplash API
const apiKey = "TLNxFEDopcl6V9fWExgVhguj33_9Qo5dNo0_0ehdcGM";
const count = 10;
const collection = "nature";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&collection=${collection}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhotos();
  } catch (error) {
    //Catch error here
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

getPhotos();
