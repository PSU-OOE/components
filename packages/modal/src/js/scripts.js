(cms => {
  cms.attach('modal', context => {
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
      const modalOverlay = modal.firstElementChild;
      const modalContainer = modalOverlay.firstElementChild;
      const modalCloseBtn = modalContainer.firstElementChild;

      modal.addEventListener('component:activate', e => {
        if (!modal.classList.contains('show-modal')) {
          modal.modalTrigger = e.detail.modal_trigger;
          showModal(modal);
          moveFocus(modalContainer);
        }
      });

      modal.addEventListener('component:deactivate', e => {
        if (!modal.classList.contains('hide-modal')) {
          hideModal(modal);
          moveFocus(modal.modalTrigger);
          modal.modalTrigger = null;
        }
      });

      // Hiding modal and returning focus to triggering element after clicking/hitting enter key on close button
      modalCloseBtn.addEventListener("click", (e) => {
        modal.dispatchEvent(new CustomEvent('component:deactivate'));
      });

      // Hiding modal when clicking outside of it and moving focus back to triggering element
      modalOverlay.addEventListener("click", (e) => {
        if ((e.target == modalOverlay) && (modal.classList.contains("show-modal"))) {
          modal.dispatchEvent(new CustomEvent('component:deactivate'));
        }
      });

      // Hiding modal when hitting the escape key and moving focus back to triggering element
      modal.addEventListener("keyup", (e) => {
        if ((e.key == "Escape") || (e.keycode === 27) && (modal.classList.contains("show-modal"))) {
          modal.dispatchEvent(new CustomEvent('component:deactivate'));
        }
      })
    });
  });
})(cms);
