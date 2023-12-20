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
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

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
// const initialCoords = section1.getBoundingClientRect();

// function stickyNavBar() {
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// }

// window.addEventListener("scroll", stickyNavBar);

function stickyNav(entries) {
  const [entry] = entries; //destrcuture to get the first element
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy load images
function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "50px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider

slider.style.overflow = "visible";
let currentSlide = 0;
const maxSlide = slides.length;

function initSlider() {
  goToSlide(0);
  createDots();
  activeDot(0);
}

function createDots() {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

function activeDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

function nextSlide() {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

function keyboardFunc(e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide();
  // e.key === "ArrowLeft" && prevSlide();
  if (e.key === "ArrowRight") nextSlide();
  // e.key === "ArrowRight" && nextSlide();
}

function dotFunc(e) {
  if (e.target.classList.contains("dots__dot")) {
    //  const slide = e.target.dataset.slide;
    // slide value matches on left & right, use destructuring
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(currentSlide);
  }
}

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);
document.addEventListener("keydown", keyboardFunc);
// Event delegation (event is attached to common parent)
dotContainer.addEventListener("click", dotFunc);
initSlider();
