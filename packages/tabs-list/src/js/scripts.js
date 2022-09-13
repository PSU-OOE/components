/**
 * @file
 * Provides interactive support for tabs components.
 */
(cms => {

  /**
   * Gets the current tab orientation.
   *
   * @param {HTMLElement} tabs_list
   *   The tab element to evaluate.
   *
   * @returns {string}
   *   A string, either 'horizontal' or 'vertical'.
   */
  function getOrientation(tabs_list) {
    let orientation = 'horizontal';
    if (tabs_list.classList.contains('tabs-list--automatic') && tabs_list.getAttribute('data-flex-mode') !== 'horizontal') {
      orientation = 'vertical';
    }
    else if (tabs_list.classList.contains('tabs-list--vertical')) {
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
    const tabs_list = target.closest('.tabs-list');
    const buttons = tabs_list.querySelectorAll('.tabs-list__button');

    // Revalidate the states of each button / panel.
    buttons.forEach(sibling => {
      // If the current button is not the one that was clicked, then set
      // aria-selected to false and hide the associated panel.
      if (target !== sibling) {
        sibling.setAttribute('aria-selected', 'false');
        sibling.setAttribute('tabindex', '-1');
        const panel_id = sibling.getAttribute('aria-controls');

        // Note - document is used here because tab panels can act as proxies.
        const panel = document.querySelector('#' + panel_id);
        if (panel) {
          panel.classList.remove('tabs__panel--active');
        }
      }

      // If the current button was clicked, make sure it was not previously
      // selected before changing any states.
      else if(target.getAttribute('aria-selected') !== 'true') {
        sibling.setAttribute('aria-selected', 'true');
        sibling.setAttribute('tabindex', '');
        sibling.focus();
        const panel_id = sibling.getAttribute('aria-controls');

        // Note - document is used here because tab panels can act as proxies.
        const panel = document.querySelector('#' + panel_id);
        if (panel) {
          panel.classList.add('tabs__panel--active');
        }
      }
    });
  }

  /**
   * Listener for keydown events.
   *
   * @param {KeyboardEvent} event - the keydown event
   */
  function onKeyDown(event) {
    const target = event.target;
    const tabs_list = target.closest('.tabs-list');
    const key = event.key;
    const orientation = getOrientation(tabs_list);
    const active_item = tabs_list.querySelector('.tabs-list__button[aria-selected="true"]');

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
          const first = tabs_list.querySelector('.tabs-list__button:first-child');
          first.click();
          break;
        case 'End':
          const last = tabs_list.querySelector('.tabs-list__button:last-child');
          last.click();
          break;
      }
    }
  }

  cms.attach('tabsList', context => {
    const tabs_lists = context.querySelectorAll('.tabs-list');
    tabs_lists.forEach(tabs_list => {
      tabs_list.addEventListener('keydown', onKeyDown);
      const buttons = tabs_list.querySelectorAll('.tabs-list__button');
      buttons.forEach(button => {
        button.addEventListener('click', onClick);
      });
    });

    // Auto-select a tab if the user is heading there.
    if (context === document) {
      const id = window.location.hash.replace('#', '');
      const button = document.querySelector('[aria-controls="' + id + '"]');
      if (button && button.getAttribute('aria-selected') === 'false') {
        button.click();
      }
    }
  });

})(cms);
