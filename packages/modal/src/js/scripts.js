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
// const showModal = () => {
//   modal_container.style.display = "flex";
//   modal_overlay.style.display = "flex";
// }

// const hideModal = () => {
//   modal_container.style.display = "none";
//   modal_overlay.style.display = "none";
//   modal_trigger.focus();
// }

// Showing modal
// modal_trigger.addEventListener("click", showModal);

// Will likely need refactored based on final implementation/HTML/DOM structure
// TODO: Figure out why it's only firing once per button
modal_triggers.forEach((trigger) => trigger.addEventListener("click", (e) => {
  const modal = trigger.nextElementSibling;
  modal.classList.add("show-modal");
}));

// Hiding modal when clicking on x and moving focus back to triggering element
// modal_close.addEventListener("click", hideModal);

modal_closes.forEach((close) => close.addEventListener("click", (e) => {
  const modalContainer = close.parentElement;
  const modalOverlay = modalContainer.parentElement;
  const modal = modalOverlay.parentElement;
  const modalTrigger = modal.previousElementSibling;
  modal.classList.add("hide-modal");
  modal.classList.remove("show-modal");
  modalTrigger.focus();
}));

// Hiding modal when hitting the enter key on x and moving focus back to triggering element
modal_close.addEventListener("keyup", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    hideModal();
  }
});

modal_closes.forEach((close) => close.addEventListener("keyup", (e) => {
  const modalContainer = close.parentElement;
  const modalOverlay = modalContainer.parentElement;
  const modal = modalOverlay.parentElement;
  const modalTrigger = modal.previousElementSibling;

  if (e.key === 'Enter' || e.keyCode === 13) {
    modal.classList.add("hide-modal");
    modal.classList.remove("show-modal");
    modalTrigger.focus();
  }
}));

// Hiding modal when clicking outside of it and moving focus back to triggering element
modal_overlay.addEventListener("click", (e) => {
  if ((e.target == modal_overlay) && (modal_container.style.display == "flex") && (modal_overlay.style.display == "flex")) {
    hideModal();
  }
});
