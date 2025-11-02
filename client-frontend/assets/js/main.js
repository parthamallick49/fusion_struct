// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navbar toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }
});
