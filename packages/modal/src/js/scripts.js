// Variables
const modal_close = document.querySelector(".modal__close");
const modal_trigger = document.querySelector(".modal__trigger");
const modal_container = document.querySelector(".modal__container");
const modal_overlay = document.querySelector(".modal__overlay");
const modal_svg = document.querySelector(".modal__close .sprite--fa-times");

const modal_closes = document.querySelectorAll(".modal__close");
const modal_triggers = document.querySelectorAll(".modal__trigger");
const modal_containers = document.querySelectorAll(".modal__container");
const modal_overlays = document.querySelectorAll(".modal__overlay");
const modal_svgs = document.querySelectorAll(".modal__close .sprite--fa-times");

// Attributes
modal_closes.forEach(close => close.setAttribute("alt", "Close"));
modal_svgs.forEach(svg => svg.setAttribute("aria-hidden", "true"));
modal_containers.forEach((container) => {
  container.setAttribute("role", "dialog");
  container.setAttribute("aria-modal", "true");
});

// Functions
const showModal = () => {
  modal_container.style.display = "flex";
  modal_overlay.style.display = "flex";
}

const hideModal = () => {
  modal_container.style.display = "none";
  modal_overlay.style.display = "none";
  modal_trigger.focus();
}

// Showing modal
modal_trigger.addEventListener("click", showModal);

// Hiding modal when clicking on x and moving focus back to triggering element
modal_close.addEventListener("click", hideModal);

// Hiding modal when hitting the enter key on x and moving focus back to triggering element
modal_close.addEventListener("keyup", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    hideModal();
  }
});

// Hiding modal when clicking outside of it and moving focus back to triggering element
modal_overlay.addEventListener("click", (e) => {
  if ((e.target == modal_overlay) && (modal_container.style.display == "flex") && (modal_overlay.style.display == "flex")) {
    hideModal();
  }
});
