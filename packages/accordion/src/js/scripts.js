/**
 * @file
 * Provides an accessible accordion implementation.
 */
((cms) => {
  cms.attach('accordion', context => {
    const accordions = cms.once('accordion', '.accordion', context);

    accordions.forEach(accordion => {
      const button = accordion.querySelector('.accordion__button');
      const content = accordion.querySelector('.accordion__expandable-content');

      accordion.addEventListener('component:activate', e => {

        if (e?.detail?.disable_animation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          content.style['transition-duration'] = '0ms';
          content.style['height'] = null;
          accordion.classList.add('accordion--expanded');
          button.setAttribute('aria-expanded', 'true');
        }
        else {
          content.style['transition-duration'] = Math.min(Math.max(content.scrollHeight / 2, 200), 1500) + 'ms';
          accordion.classList.add('accordion--expanded');
          button.setAttribute('aria-expanded', 'true');
          cms.expand(content);
        }
      });

      accordion.addEventListener('component:deactivate', e => {
        if (e?.detail?.disable_animation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          content.style['transition-duration'] = '0ms';
          content.style['height'] = '0';
          accordion.classList.remove('accordion--expanded');
          button.setAttribute('aria-expanded', 'false');
        }
        else {
          content.style['transition-duration'] = Math.min(Math.max(content.scrollHeight / 2, 200), 1500) + 'ms';
          accordion.classList.remove('accordion--expanded');
          button.setAttribute('aria-expanded', 'false');
          cms.collapse(content);
        }
      });

      button.addEventListener('click', () => {

        const state = button.getAttribute('aria-expanded');
        if (state === 'true') {
          accordion.dispatchEvent(new CustomEvent('component:deactivate'));
        }
        else {
          accordion.dispatchEvent(new CustomEvent('component:activate', {
            detail: {
              activation_type: 'USER_ACTIVATE',
            }
          }));
        }
      });
    });
  });
})(cms);
