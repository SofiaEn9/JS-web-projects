const modal = document.getElementById("modal-container");
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-icon");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameElement = document.getElementById("website-name");
const websiteURLElement = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = [];

function showModalWindow() {
  modal.classList.add("show-modal");
  websiteNameElement.focus();
}

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Sofia Enriquez portfolio",
        url: "sofia-enriquez.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

function validate(nameValue, urlValue) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
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
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameElement.focus();
}

showModal.addEventListener("click", showModalWindow);
closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (event) =>
  event.target === modal ? modal.classList.remove("show-modal") : false
);
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();
