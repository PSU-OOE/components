/**
 * @file
 * Provides javascript behaviors for feature detecting flex-gap.
 */
(Drupal => {

  /**
   * Provides a flex-gap workaround for older Safari browsers.
   *
   * @TODO: Delete when Safari support is no longer needed.
   *
   * @type {{attach: Drupal.behaviors.polyfillFlexGap.attach}}
   *   Attaches the behavior to the provided context.
   */
  Drupal.behaviors.polyfillFlexGap = {

    attach: context => {

      // Only run on the document context.
      if (context !== document) {
        return;
      }

      // Do a quick user-agent based comparison to check if this is Safari.
      const ua_safari = navigator.userAgent.indexOf('Safari') > -1;
      const ua_chrome = navigator.userAgent.indexOf('Chrome') > -1;
      if (ua_safari && !ua_chrome) {

        // Do a more advanced test to determine if this version of Safari
        // supports the gap property for flexbox.  This test will temporarily
        // add a node to the DOM and check its height to determine if the
        // gap property works or not.

        const test = document.createElement('div');
        Object.assign(test.style, {
          position: 'absolute',
          bottom: '0',
          opacity: '0',
          visibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1px',
        });

        // Add enough child nodes so that a gap should happen.
        test.appendChild(document.createElement("div"));
        test.appendChild(document.createElement("div"));


        // Add the test node to the DOM.
        document.body.append(test);

        // If there test container isn't 1px tall, flex gap isn't supported.
        if (test.scrollHeight !== 1) {
          document.documentElement.classList.add('no-flex-gap');
        }

        // Remove the test node from the DOM.
        test.parentNode.removeChild(test);
      }
    }
  };
})(Drupal);
