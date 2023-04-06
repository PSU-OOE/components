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

    modals.forEach((modal) => {
      const modalOverlay = modal.firstElementChild;
      const modalContainer = modalOverlay.firstElementChild;
      const modalCloseBtn = modalContainer.firstElementChild;

      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

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

      modal.addEventListener("keyup", (e) => {
        if ((e.key == "Escape" || e.keyCode == 27) && modal.classList.contains("show-modal")) {
          modal.dispatchEvent(new CustomEvent('component:deactivate'));
        }
      });

      modal.addEventListener("keydown", (e) => {
        if ((e.key == "Tab" || e.keyCode === 9) && modal.classList.contains("show-modal")) {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      })
    });
  });
})(cms);
