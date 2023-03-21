const modal_close_sprite = document.querySelector(".modal__close .sprite--fa-times");
const modal_open_button = document.querySelector(".modal__open");
const modal_container = document.querySelector(".modal__container");
const modal_overlay = document.querySelector(".modal__overlay");

modal_close_sprite.setAttribute("alt", "Close");

modal_open_button.addEventListener("click", () => {
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
