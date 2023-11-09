const modal = document.getElementById("modal-container");
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-icon");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameElement = document.getElementById("website-name");
const websiteURLElement = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmark-container");

function showModalWindow() {
  modal.classList.add("show-modal");
  websiteNameElement.focus();
}

showModal.addEventListener("click", showModalWindow);
closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (event) =>
  event.target === modal ? modal.classList.remove("show-modal") : false
);
