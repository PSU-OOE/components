(cms => {
  cms.attach('dropbutton', context => {
    const drop_buttons = cms.once('dropbutton', '.drop-button', context);
    drop_buttons.forEach(drop_button => {
      const toggle = drop_button.querySelector('.drop-button__toggle');

      // Toggle the expanded state of drop-button menus on click.
      toggle.addEventListener('click', () => {
        if (document.activeElement !== toggle) {
          toggle.focus();
        }

        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
        else {
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      // @TODO: This is a hack needed for hacky Safari
      toggle.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          if (toggle.getAttribute('aria-expanded') === 'true') {
            toggle.setAttribute('aria-expanded', 'false');
          }
          else {
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });

      // Close an open drop-button menu when escape is pressed.
      drop_button.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close an open drop-button menu when focus leaves the component.
      drop_button.addEventListener('focusout', (e) => {
        console.log(e);
        if (!drop_button.contains(e.relatedTarget)) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
})(cms);
