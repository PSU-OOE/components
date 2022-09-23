(cms => {
    cms.attach( context => {
      const elements = context.querySelectorAll('.expandable-section');
      elements.forEach(element => {
        const expand = element.querySelector('.expandable-section__expand');
        const content = element.querySelector('.expandable-section__content');
        const collapse = element.querySelector('.expandable-section__collapse');

        expand.addEventListener('click', () => {
          content.style['transition-duration'] = (content.scrollHeight / 2) + 'ms';
          collapse.setAttribute('aria-expanded', 'true');
          expand.setAttribute('aria-expanded', 'true');
          cms.expand(content);
          collapse.style.display = 'block';
          expand.style.display = 'none';

          // Say something for A/T users.
          Drupal.announce('expanded', 'assertive');

        });

        collapse.addEventListener('click', () => {
          content.style['transition-duration'] = (content.scrollHeight / 2) + 'ms';

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
      });
    });
})(cms);
