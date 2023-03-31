// Variables
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

// Showing modal when clicking triggering element
// Will likely need refactored based on final implementation/HTML/DOM structure
modal_triggers.forEach((trigger) => trigger.addEventListener("click", (e) => {
  const modal = trigger.nextElementSibling;
  modal.classList.add("show-modal");
  modal.classList.remove("hide-modal");
}));

// Hiding modal and returning focus to triggering element after clicking or hitting enter key on close button
modal_closes.forEach((close) => {
  const modal = close.parentElement.parentElement.parentElement;
  const modalTrigger = modal.previousElementSibling;

  close.addEventListener("click", (e) => {
    modal.classList.add("hide-modal");
    modal.classList.remove("show-modal");
    modalTrigger.focus();
  })

  close.addEventListener("keyup", (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      modal.classList.add("hide-modal");
      modal.classList.remove("show-modal");
      modalTrigger.focus();
    }
  });
});

// Hiding modal when clicking outside of it and moving focus back to triggering element
modal_overlays.forEach((overlay) => overlay.addEventListener("click", (e) => {
  const modal = overlay.parentElement;
  const modalTrigger = modal.previousElementSibling;

  if ((e.target == overlay) && (modal.classList.contains("show-modal"))) {
    modal.classList.add("hide-modal");
    modal.classList.remove("show-modal");
    modalTrigger.focus();
  }
}));
