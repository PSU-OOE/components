/**
 * @file
 * Provides a performant focus-visible polyfill loader.
 */
(Drupal => {
  Drupal.behaviors.polyfillFocusVisible = {
    attach: context => {
      if (context === document) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        try {
          style.sheet.insertRule(':focus-visible { color: initial }');
          style.sheet.deleteRule(0);
        }
        catch (e) {
          const script = document.createElement('script');
          script.src = '/themes/custom/worldcampus/components/polyfill-focus-visible/vendor/focus-visible@5.2.0.min.js';
          document.body.appendChild(script);
        }
        finally {
          document.head.removeChild(style);
        }
      }
    },
  };
})(Drupal);
