(cms => {
  cms.attach('dropbutton', context => {
    const drop_buttons = context.querySelectorAll('.drop-button');
    drop_buttons.forEach(drop_button => {
      const toggle = drop_button.querySelector('.drop-button__toggle');
      toggle.addEventListener('click', () => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
        else {
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      drop_button.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      drop_button.addEventListener('focusout', (e) => {
        if (!drop_button.contains(event.relatedTarget)) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
})(cms);
