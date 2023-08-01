(cms => {
    cms.attach('expandableSection', context => {
      const elements = cms.once('expandableSection', '.expandable-section', context);
      elements.forEach(element => {
        const expand = element.querySelector('.expandable-section__expand');
        const content = element.querySelector('.expandable-section__content');
        const collapse = element.querySelector('.expandable-section__collapse');

        element.addEventListener('component:activate', e => {
          collapse.setAttribute('aria-expanded', 'true');
          expand.setAttribute('aria-expanded', 'true');

          if (e?.detail?.disable_animation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            content.style['transition-duration'] = '0ms';
            content.style['height'] = null;
          }
          else {
            content.style['transition-duration'] = (content.scrollHeight / 2) + 'ms';
            cms.expand(content);
          }
          collapse.style.display = 'block';
          expand.style.display = 'none';

          // Say something for A/T users.
          cms.announce('expanded', 'assertive');

        });

        element.addEventListener('component:deactivate', e => {

          collapse.setAttribute('aria-expanded', 'false');
          expand.setAttribute('aria-expanded', 'false');
          if (e?.detail?.disable_animation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            content.style['transition-duration'] = '1ms';
            content.style['height'] = '0';
          }
          else {
            content.style['transition-duration'] = (content.scrollHeight / 2) + 'ms';
            cms.collapse(content);
          }
          function afterCollapse() {
            content.removeEventListener('transitionend', afterCollapse);
            expand.style.display = 'block';
            expand.focus();
            collapse.style.display = 'none';
          }
          content.addEventListener('transitionend', afterCollapse);

        });

        expand.addEventListener('click', () => {
          element.dispatchEvent(new CustomEvent('component:activate', {
            detail: {
              activation_type: 'USER_ACTIVATE',
            }
          }));
        });

        collapse.addEventListener('click', () => {
          element.dispatchEvent(new CustomEvent('component:deactivate'));
        });
      });
    });
})(cms);
