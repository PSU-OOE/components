const modal_close_sprite = document.querySelector(".modal__close .sprite--fa-times");
const modal_trigger = document.querySelector(".modal__trigger");
const modal_container = document.querySelector(".modal__container");
const modal_overlay = document.querySelector(".modal__overlay");
const modal_svg = document.querySelector(".modal__close .sprite--fa-times")

modal_close_sprite.setAttribute("alt", "Close");
modal_container.setAttribute("role", "dialog");
// modal_container.setAttribute("tabindex", "-1");
modal_svg.setAttribute("tabindex", "0");

modal_trigger.addEventListener("click", () => {
  modal_container.style.display = "flex";
  modal_overlay.style.display = "flex";
});

modal_close_sprite.addEventListener("click", () => {
  modal_container.style.display = "none";
  modal_overlay.style.display = "none";
});

modal_overlay.addEventListener("click", (e) => {
  if ((e.target == modal_overlay) && (modal_container.style.display == "flex") && (modal_overlay.style.display == "flex")) {
    modal_container.style.display = "none";
    modal_overlay.style.display = "none";
  }
});
