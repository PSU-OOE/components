// Variables
const modals = document.querySelectorAll(".modal");

// Functions
const showModal = (element) => {
  element.classList.add("show-modal");
  element.classList.remove("hide-modal");
};

const hideModal = (element) => {
  element.classList.add("hide-modal");
  element.classList.remove("show-modal");
};

const moveFocus = (element) => {
  element.focus();
};

// TODO: All functionality to return focus to the triggering element will likely need to be refactored
// based on final implementation/HTML/DOM structure. For now, it's a button that is the previous direct sibling
// to the outer .modal div

modals.forEach((modal) => {
  const modalTrigger = modal.previousElementSibling;
  const modalOverlay = modal.firstElementChild;
  const modalContainer = modalOverlay.firstElementChild;
  const modalCloseBtn = modalContainer.firstElementChild;
  const modalCloseBtnSvg = modalCloseBtn.firstElementChild;

  // Attributes
  modalCloseBtnSvg.setAttribute("aria-hidden", "true");

  // Showing modal when clicking triggering element and moving focus to modal container
  modalTrigger.addEventListener("click", (e) => {
    showModal(modal);
    moveFocus(modalContainer);
  });

  // Hiding modal and returning focus to triggering element after clicking/hitting enter key on close button
  modalCloseBtn.addEventListener("click", (e) => {
    hideModal(modal);
    moveFocus(modalTrigger);
  });

  // Hiding modal when clicking outside of it and moving focus back to triggering element
  modalOverlay.addEventListener("click", (e) => {
    if ((e.target == modalOverlay) && (modal.classList.contains("show-modal"))) {
      hideModal(modal);
      moveFocus(modalTrigger);
    }
  });

  // Hiding modal when hitting the escape key and moving focus back to triggering element
  modal.addEventListener("keyup", (e) => {
    if ((e.key == "Escape") || (e.keycode === 27) && (modal.classList.contains("show-modal"))) {
      hideModal(modal);
      moveFocus(modalTrigger);
    }
  })
});
