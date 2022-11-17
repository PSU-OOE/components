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

      // Note - call focus explicitly to influence the ':focus-visible' heuristic.
      switch (key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          const previous = active_item.previousElementSibling;
          if (previous) {
            previous.click();
            previous.focus();
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          const next = active_item.nextElementSibling;
          if (next) {
            next.click();
            next.focus();
          }
          break;
        case 'Home':
          const first = tabs_list.querySelector('.tabs-list__button:first-child');
          first.click();
          first.focus();
          break;
        case 'End':
          const last = tabs_list.querySelector('.tabs-list__button:last-child');
          last.click();
          last.focus();
          break;
      }
    }
  }

  cms.attach('tabsList', context => {
    const tabs_list_elements = context.querySelectorAll('.tabs-list');

    tabs_list_elements.forEach(tabs_list_element => {
      const buttons = tabs_list_element.querySelectorAll('.tabs-list__button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          document.getElementById(button.getAttribute('aria-controls')).dispatchEvent(
            new CustomEvent('component:activate', {
              detail: {
                activation_type: 'USER_ACTIVATE',
                original_activation_type: 'USER_ACTIVATE',
              }
            })
          );
        });
      });
      tabs_list_element.addEventListener('keydown', onKeyDown);
    });
  });

  cms.attach('tabs', context => {
    const tabs_elements = context.querySelectorAll('.tabs');

    tabs_elements.forEach(tabs_element => {
      const panels = tabs_element.querySelectorAll('.tabs__panel');
      panels.forEach(panel => {
        panel.addEventListener('component:activate', () => {
          console.debug('Request to activate tab panel ' + panel.id + ' was received.');
          const target = tabs_element.querySelector('[aria-controls="' + panel.getAttribute('id') + '"]');
          if (target.getAttribute('aria-selected') === 'false') {
            const buttons = tabs_element.querySelectorAll('.tabs-list__button');

            // Revalidate the states of each button / panel.
            buttons.forEach(sibling => {
              const panel_id = sibling.getAttribute('aria-controls');
              const sibling_panel = tabs_element.querySelector('#' + panel_id);
              // If the current button is not the one that was clicked, then set
              // aria-selected to false and hide the associated panel.
              if (target !== sibling) {
                sibling_panel.dispatchEvent(new CustomEvent('component:deactivate', {detail: {target: sibling_panel}}));
              }
              else {
                // If the current button was clicked, make sure it was not previously
                // selected before changing any states.
                if(target.getAttribute('aria-selected') !== 'true') {
                  sibling.setAttribute('aria-selected', 'true');
                  sibling.setAttribute('tabindex', '');
                  sibling_panel.classList.add('tabs__panel--active');
                  panel.dispatchEvent(new CustomEvent('component:activated', { detail: {target: target } }));
                }
              }
            });
            console.debug('Tab panel ' + panel.id + ' has been activated.');
          }
          else {
            console.debug('Tab panel ' + panel.id + ' was already activated.');
          }
        });

        panel.addEventListener('component:deactivate', () => {
          console.debug('Request to deactivate tab panel ' + panel.id + ' was received.');
          const button = context.querySelector('[aria-controls="' + panel.getAttribute('id') + '"]');
          if (button.getAttribute('aria-selected') === 'true') {
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
            panel.classList.remove('tabs__panel--active');
            panel.dispatchEvent(new CustomEvent('component:deactivated'));
            console.debug('Tab panel ' + panel.id + ' has been deactivated.');
          }
          else {
            console.debug('Tab panel ' + panel.id + ' was already deactivated.');
          }
        });
      });
    });
  });

})(cms);
