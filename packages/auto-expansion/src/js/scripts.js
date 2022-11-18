/**
 * @file
 * Provides auto-expansion capabilities for interactive component paths.
 *
 * This means that users visiting pages with URL fragments that would otherwise
 * be hidden by progressive disclosure will still be able to be scrolled to the
 * correct location with all interactive elements that would have been in their
 * way automatically opened for them.
 *
 * This also handles in-page anchor link clicks.
 */

(cms => {

  cms.attach('autoExpandComponentPath', context => {
    /**
     * Activates all interactive ancestor components of target, including target.
     *
     * @param {HTMLElement} target
     *   The component to auto-activate.
     * @param {string} activation_type
     *   The type of event that triggered the auto-activation.
     */
    function autoActivateComponent(target, activation_type) {
      const original_target = target;
      const interactive_path = [];

      // Starting from target, go up in the DOM to find interactive ancestors.
      do {
        if (target.hasAttribute('data-interactive-component')) {

          // Since we're traversing upwards in the DOM, place each match at
          // the beginning of the array. This allows callers to traverse the
          // array directly in order to visit outermost elements first, and
          // innermost elements last.
          interactive_path.unshift(target);
        }
        target = target.parentElement;
      }
      while (target.parentElement);
      // Activate each component, being sure to disable animation.
      interactive_path.forEach((component, index) => {
        component.dispatchEvent(
          new CustomEvent('component:activate', {
            detail: {
              disable_animation: true,
              activation_type: interactive_path.length - index > 1 ? 'AUTO_EXPAND' : activation_type,
            }
          })
        );
      });
      requestAnimationFrame(() => {
        original_target.scrollIntoView(true);
      });
    }

    // Handle visitors coming in with fragments in the URL.
    if (context === document) {
      const fragment = location.hash;
      if (fragment) {

        // Since we can't reasonably guarantee that all component libraries
        // have loaded at this point, we defer component activation to the
        // window's load event, at which point all of Drupal's libraries have
        // had a chance to load.  This ensures that all component activate
        // event listeners have been properly registered.
        window.addEventListener('load', () => {
          const target = context.querySelector(fragment);
          if (target) {
            autoActivateComponent(target, 'PAGE_LOAD');
          }
        });
      }

      // Any time the hash changes, we need to make sure that the new target
      // is accessible.  By tapping into popstate, we can auto-expand the
      // component path before the native navigate to fragment behavior
      // happens.
      window.addEventListener('popstate', () => {
        const fragment = location.hash;
        if (fragment) {
          const target = context.querySelector(fragment);
          if (target) {
            autoActivateComponent(target, 'USER_ACTIVATE');
          }
        }
      });
    }
  });
})(cms);
