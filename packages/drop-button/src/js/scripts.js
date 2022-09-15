(cms => {
  cms.attach('dropbutton', context => {
    const drop_buttons = context.querySelectorAll('.drop-button');
    drop_buttons.forEach(drop_button => {
      const toggle = drop_button.querySelector('.drop-button__toggle');

      // Toggle the expanded state of drop-button menus on click.
      toggle.addEventListener('click', () => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
        else {
          toggle.setAttribute('aria-expanded', 'true');
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
        if (!drop_button.contains(e.relatedTarget)) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
})(cms);
