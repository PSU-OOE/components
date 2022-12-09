(cms => {
    cms.attach('expandableSection', context => {
      const elements = context.querySelectorAll('.expandable-section');
      elements.forEach(element => {
        const expand = element.querySelector('.expandable-section__expand');
        const content = element.querySelector('.expandable-section__content');
        const collapse = element.querySelector('.expandable-section__collapse');

        element.addEventListener('component:activate', e => {
          content.style['transition-duration'] = (e?.detail?.disable_animation ? 0 : (content.scrollHeight / 2)) + 'ms';
          collapse.setAttribute('aria-expanded', 'true');
          expand.setAttribute('aria-expanded', 'true');
          cms.expand(content);
          collapse.style.display = 'block';
          expand.style.display = 'none';

          // Say something for A/T users.
          cms.announce('expanded', 'assertive');

        });

        element.addEventListener('component:deactivate', e => {
          content.style['transition-duration'] = (e?.detail?.disable_animation ? 0 : (content.scrollHeight / 2)) + 'ms';

          collapse.setAttribute('aria-expanded', 'false');
          expand.setAttribute('aria-expanded', 'false');
          cms.collapse(content);

          function afterCollapse() {
            content.removeEventListener('transitionend', afterCollapse);
            expand.style.display = 'block';
            expand.focus();
            collapse.style.display = 'none';
          }
          content.addEventListener('transitionend', afterCollapse);

        });

        expand.addEventListener('click', () => {
          element.dispatchEvent(new CustomEvent('component:activate'));
        });

        collapse.addEventListener('click', () => {
          element.dispatchEvent(new CustomEvent('component:deactivate'));
        });
      });
    });
})(cms);
