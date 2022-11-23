/**
 * @file
 * Provides auto-expansion capabilities for interactive component paths.
 *
 * This means that users visiting pages with URL fragments linking to
 * inaccessible targets will now be scrolled to the correct location
 * with all interactive elements that would have otherwise been in their
 * way automatically activated.
 *
 * This also handles in-page anchor link clicks and native navigation events.
 *
 * IMPORTANT:
 *   This DOES NOT interfere with native events for history / focus management!
 */
(cms => {

  cms.attach('autoExpansion', context => {

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
          // innermost elements last -- exactly like manual activation would.
          interactive_path.unshift(target);
        }
        target = target.parentElement;
      }
      while (target.parentElement);

      // Attempt to activate each component, being sure to disable animation.
      interactive_path.forEach((component, index) => {
        component.dispatchEvent(
          new CustomEvent('component:activate', {
            detail: {
              disable_animation: true,

              // For all elements except for the original target, set the
              // activation type to 'AUTO_EXPAND'.  This separates "by-product"
              // events from those initiated directly by an end user.
              activation_type: interactive_path.length - index > 1 ? 'AUTO_EXPAND' : activation_type,
            }
          })
        );
      });

      // On the next animation frame, ensure that the user is scrolled to
      // the proper location on the page.  After auto-expansion completes,
      // it should be reasonably guaranteed that the original target is now
      // in view, visible, and accessible as native browser events dictate.
      //
      // IMPORTANT: Since we have not interfered with any native browser
      // events, the user-agent should have full control over history and
      // focus management.  WE DO NOT HAVE TO EXPLICITLY FOCUS ON THE TARGET!
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
      // component path before the native "navigate to fragment" behavior
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
