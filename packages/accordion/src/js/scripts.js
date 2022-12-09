/**
 * @file
 * Provides an accessible accordion implementation.
 */
((cms) => {
  cms.attach('accordion', context => {
    const accordions = context.querySelectorAll('.accordion');
    accordions.forEach(accordion => {

      const button = accordion.querySelector('.accordion__button');
      const content = accordion.querySelector('.accordion__expandable-content');

      /**
       * Adjusts the transition delay property for the current accordion.
       *
       * @param {boolean} disable_animation
       *   Should animation be completely disabled?
       */
      function adjustTransition(disable_animation) {
        const transition = (disable_animation ? 0 : Math.max(content.scrollHeight / 2, 200)) + 'ms';
        button.querySelector('.sprite').style['transition-duration'] = transition;
        content.style['transition-duration'] = transition;
      }

      accordion.addEventListener('component:activate', e => {
        const state = button.getAttribute('aria-expanded');
        if (state === 'false') {
          adjustTransition(e?.detail?.disable_animation);

          accordion.classList.add('accordion--expanded');
          button.setAttribute('aria-expanded', 'true');
          cms.expand(content);

          accordion.dispatchEvent(new CustomEvent('component:activated'));
        }
      });

      accordion.addEventListener('component:deactivate', e => {
        const state = button.getAttribute('aria-expanded');
        if (state === 'true') {
          adjustTransition(e?.detail?.disable_animation);

          accordion.classList.remove('accordion--expanded');
          button.setAttribute('aria-expanded', 'false');
          cms.collapse(content);

          accordion.dispatchEvent(new CustomEvent('component:deactivated'));
        }
      });

      button.addEventListener('click', () => {
        if (button.getAttribute('aria-expanded') === 'false') {
          accordion.dispatchEvent(new CustomEvent('component:activate', {
            detail: {
              activation_type: 'USER_ACTIVATE',
            }
          }));
        }
        else {
          accordion.dispatchEvent(new CustomEvent('component:deactivate'));
        }
      });
    });
  });
})(cms);
