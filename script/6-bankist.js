"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

///////////////////////////////////////
// Button Scroll
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function linkScrollTo(e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
}

btnScrollTo.addEventListener("click", linkScrollTo);

///////////////////////////////////////
// Page Navigation

function navScrollTo(e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
}

navLinks.addEventListener("click", navScrollTo);

// Tabbed Component
function changeTab(e) {
  const clickedButton = e.target.closest(".operations__tab");
  // Guard clause
  if (!clickedButton) return;
  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  // Activate tab
  clickedButton.classList.add("operations__tab--active");
  // Activate content area

  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add("operations__content--active");
}
// tabs.forEach(tab => tab.addEventListener("click", changeTab);
tabsContainer.addEventListener("click", changeTab);

// Menu fade animation
function navAnimation(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblingLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblingLinks.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener("mouseover", navAnimation.bind(0.5));
nav.addEventListener("mouseout", navAnimation.bind(1));

// Sticky Navigation
const initialCoords = section1.getBoundingClientRect();

function stickyNavBar() {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

window.addEventListener("scroll", stickyNavBar);
