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
            document.getElementById(previous.getAttribute('aria-controls')).dispatchEvent(
              new CustomEvent('component:activate', {
                detail: {
                  activation_type: 'USER_ACTIVATE',
                  original_activation_type: 'USER_ACTIVATE',
                }
              })
            );
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          const next = active_item.nextElementSibling;
          if (next) {
            document.getElementById(next.getAttribute('aria-controls')).dispatchEvent(
              new CustomEvent('component:activate', {
                detail: {
                  activation_type: 'USER_ACTIVATE',
                  original_activation_type: 'USER_ACTIVATE',
                }
              })
            );
          }
          break;
        case 'Home':
          const first = tabs_list.querySelector('.tabs-list__button:first-child');
          document.getElementById(first.getAttribute('aria-controls')).dispatchEvent(
            new CustomEvent('component:activate', {
              detail: {
                activation_type: 'USER_ACTIVATE',
                original_activation_type: 'USER_ACTIVATE',
              }
            })
          );
          break;
        case 'End':
          const last = tabs_list.querySelector('.tabs-list__button:last-child');
          document.getElementById(last.getAttribute('aria-controls')).dispatchEvent(
            new CustomEvent('component:activate', {
              detail: {
                activation_type: 'USER_ACTIVATE',
                original_activation_type: 'USER_ACTIVATE',
              }
            })
          );
      }
    }
  }

  /**
   * Attaches the tabs behavior to each tab component.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Add event listeners to tabs components in the attached context.
   */
  cms.attach('tabsList', context => {
    const tabs_list_elements = context.querySelectorAll('.tabs-list');

    tabs_list_elements.forEach(tabs_list_element => {
      const tabs_element = tabs_list_element.closest('.tabs');
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

})(cms);
