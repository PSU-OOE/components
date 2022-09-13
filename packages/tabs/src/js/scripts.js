/**
 * @file
 * Provides interactive support for tabs components.
 */
(cms => {

  /**
   * Gets the current tab orientation.
   *
   * @param {HTMLElement} tabs
   *   The tab element to evaluate.
   *
   * @returns {string}
   *   A string, either 'horizontal' or 'vertical'.
   */
  function getOrientation(tabs) {
    let orientation = 'horizontal';
    if (tabs.classList.contains('tabs--automatic')) {
      const list = tabs.querySelector('.tabs__list');
      if (list.getAttribute('data-flex-mode') !== 'horizontal') {
        orientation = 'vertical';
      }
    }
    else if (tabs.classList.contains('tabs--vertical')) {
      orientation = 'vertical';
    }
    return orientation;
  }

  /**
   * Listener for click events.
   *
   * @param {Event} event - the click event
   */
  function onClick(event) {
    const target = event.target;
    const tabs = target.closest('.tabs');
    const buttons = tabs.querySelectorAll('.tabs__button');

    // Revalidate the states of each button / panel.
    buttons.forEach(sibling => {
      const panel_id = sibling.getAttribute('aria-controls');
      const panel = tabs.querySelector('#' + panel_id);

      // If the current button is not the one that was clicked, then set
      // aria-selected to false and hide the associated panel.
      if (target !== sibling) {
        sibling.setAttribute('aria-selected', 'false');
        sibling.setAttribute('tabindex', '-1');
        panel.classList.remove('tabs__panel--active');
      }
        // If the current button was clicked, make sure it was not previously
      // selected before changing any states.
      else if(target.getAttribute('aria-selected') !== 'true') {
        sibling.setAttribute('aria-selected', 'true');
        sibling.setAttribute('tabindex', '');
        sibling.focus();
        panel.classList.add('tabs__panel--active');
      }
    });
  }

  /**
   * Listener for keydown events.
   *
   * @param {KeyboardEvent} event - the keydown event
   */
  function onKeyDown(event) {
    console.log('keydown');
    const target = event.target;
    const tabs = target.closest('.tabs');
    const key = event.key;
    const orientation = getOrientation(tabs);
    const active_item = tabs.querySelector('.tabs__button[aria-selected="true"]');

    // Only handle keys that jive with the current orientation.
    if (
      key === 'Home' || key === 'End' ||
      orientation === 'vertical' && (key === 'ArrowUp' || key === 'ArrowDown') ||
      orientation === 'horizontal' && (key === 'ArrowLeft' || key === 'ArrowRight')
    ) {
      event.preventDefault();

      switch (key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          const previous = active_item.previousElementSibling;
          if (previous) {
            previous.click();
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          const next = active_item.nextElementSibling;
          if (next) {
            next.click();
          }
          break;
        case 'Home':
          const first = tabs.querySelector('.tabs__button:first-child');
          first.click();
          break;
        case 'End':
          const last = tabs.querySelector('.tabs__button:last-child');
          last.click();
      }
    }
  }

  cms.attach('tabs', context => {
    const tabs = context.querySelectorAll('.tabs');
    tabs.forEach(tab => {
      const buttons = tab.querySelectorAll('.tabs__button');
      buttons.forEach(button => {
        button.addEventListener('click', onClick);
      });
      const list = tab.querySelector('.tabs__list');
      if (list) {
        list.addEventListener('keydown', onKeyDown);
      }
    });
  });

})(cms);
