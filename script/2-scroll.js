photoArray = [];

async function getPhotos() {
  const apiKey = "TLNxFEDopcl6V9fWExgVhguj33_9Qo5dNo0_0ehdcGM";
  const count = 10;
  const collection = "nature";
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collection=${collection}`;
  try {
    const response = await fetch(apiUrl);
    const photoArray = await response.json();
    console.log(photoArray);
  } catch (error) {
    //Catch error here
  }
}

// On load
getPhotos();
