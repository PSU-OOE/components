/**
 * @file
 * Provides an accessible accordion implementation.
 */
(Drupal => {

  /**
   * Adds event listeners to all accordions within context.
   *
   * @type {{attach: Drupal.behaviors.polyfillFlexGap.attach}}
   */
  Drupal.behaviors.accordion = {
    attach: context => {
      const accordions = context.querySelectorAll('.accordion');
      accordions.forEach(accordion => {
        const button = accordion.querySelector('.accordion__button');
        const content = accordion.querySelector('.accordion__expandable-content');
        button.addEventListener('click', () => {

          // Update the transition duration for the open/close animation.
          const transition = Math.max(content.scrollHeight / 2, 200) + 'ms';
          button.querySelector('.sprite').style['transition-duration'] = transition;
          content.style['transition-duration'] = transition;

          const state = button.getAttribute('aria-expanded');
          if (state === 'true') {
            accordion.classList.remove('accordion--expanded');
            button.setAttribute('aria-expanded', 'false');
            Drupal.collapse(content);
          }
          else {
            accordion.classList.add('accordion--expanded');
            button.setAttribute('aria-expanded', 'true');
            Drupal.expand(content);
          }
        });
      });

      // Auto-expand an accordion if the user is heading there.
      if (context === document) {
        const id = window.location.hash.replace('#', '');
        const button = document.querySelector('.accordion__button[aria-controls="' + id + '"]');
        if (button && button.getAttribute('aria-expanded') === 'false') {
          button.click();
        }
      }
    }
  };
})(Drupal);
