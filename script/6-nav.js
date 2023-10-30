const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

function toggleNavBar() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");
  overlay.classList.remove("overlay-slide-right", "overlay-slide-left");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.add("overlay-slide-right");
  } else {
    overlay.classList.add("overlay-slide-left");
  }
}

menuBars.addEventListener("click", toggleNavBar);
nav1.addEventListener("click", toggleNavBar);
nav2.addEventListener("click", toggleNavBar);
nav3.addEventListener("click", toggleNavBar);
nav4.addEventListener("click", toggleNavBar);
nav4.addEventListener("click", toggleNavBar);
