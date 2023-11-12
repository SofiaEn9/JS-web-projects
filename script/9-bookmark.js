const modal = document.getElementById("modal-container");
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-icon");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameElement = document.getElementById("website-name");
const websiteURLElement = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmark-container");

let bookmarks = {};

// Show Modal, Focus on Input
function showModalWindow() {
  modal.classList.add("show-modal");
  websiteNameElement.focus();
}

// Modal event listeners
showModal.addEventListener("click", showModalWindow);
closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (event) =>
  event.target === modal ? modal.classList.remove("show-modal") : false
);

// Validate form input
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit value for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  return true;
}

function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];

    // Create item
    const item = document.createElement("div");
    item.classList.add("item");
    // Create close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-minus");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${id}')`);
    // Favicon & link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Create Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Create link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.append(item);
  });
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks array in localStorage
    const id = `https://google.com`;
    bookmarks[id] = {
      name: "Google",
      url: "https://google.com",
    };

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function deleteBookmark(id) {
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Handle data from form
function storeBookmark(event) {
  event.preventDefault();
  const nameValue = websiteNameElement.value;
  let urlValue = websiteURLElement.value;
  if (!urlValue.includes("http://") && !urlValue.includes("https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameElement.focus();
}

// Bookmark form event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();
