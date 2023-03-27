// const modal_close_sprite = document.querySelector(".modal__close .sprite--fa-times");
const modal_close = document.querySelector(".modal__close");
const modal_trigger = document.querySelector(".modal__trigger");
const modal_container = document.querySelector(".modal__container");
const modal_overlay = document.querySelector(".modal__overlay");
const modal_svg = document.querySelector(".modal__close .sprite--fa-times");

modal_close.setAttribute("alt", "Close");
modal_container.setAttribute("role", "dialog");
// modal_container.setAttribute("tabindex", "-1");
// modal_svg.setAttribute("tabindex", "0");

// Functions to show and hide modal
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
modal_trigger.addEventListener("click", showModal)

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
