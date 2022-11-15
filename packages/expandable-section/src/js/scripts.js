/**
 * @file
 * Provides expandable section component behaviors.
 */
(cms => {
    cms.attach('expandableSection', context => {

      const elements = context.querySelectorAll('.expandable-section');

      elements.forEach(element => {
        const expand = element.querySelector('.expandable-section__expand');
        const content = element.querySelector('.expandable-section__content');
        const collapse = element.querySelector('.expandable-section__collapse');

        element.addEventListener('component:activate', e => {

          // Only allow activation if not already activated.
          if (expand.getAttribute('aria-expanded') === 'false') {
            const disable_animation = ((e.detail || {}).disable_animation || false);
            content.style['transition-duration'] = (disable_animation ? 1 : (content.scrollHeight / 2)) + 'ms';
            collapse.setAttribute('aria-expanded', 'true');
            expand.setAttribute('aria-expanded', 'true');
            cms.expand(content);
            collapse.style.display = 'block';
            expand.style.display = 'none';

            // Say something for A/T users.
            cms.announce('expanded', 'assertive');

            // Signal that component activation was successful.
            element.dispatchEvent(new CustomEvent('component:activated'));
          }
        });

        element.addEventListener('component:deactivate', e => {
          // Only allow deactivation if not already deactivated.
          if (collapse.getAttribute('aria-expanded') === 'true') {
            const disable_animation = ((e.detail || {}).disable_animation || false);
            content.style['transition-duration'] = (disable_animation ? 1 : (content.scrollHeight / 2)) + 'ms';
            collapse.setAttribute('aria-expanded', 'false');
            expand.setAttribute('aria-expanded', 'false');
            cms.collapse(content);

            content.addEventListener('transitionend', function afterCollapse() {
              content.removeEventListener('transitionend', afterCollapse);
              expand.style.display = 'block';
              expand.focus();
              collapse.style.display = 'none';
            });

            // Signal that component deactivation was successful.
            element.dispatchEvent(new CustomEvent('component:deactivated'));
          }
        });

        // Simply dispatch an activate event.
        expand.addEventListener('click', () => {
          element.dispatchEvent(
            new CustomEvent('component:activate', {
              detail: {
                activation_type: 'USER_ACTIVATE',
                original_activation_type: 'USER_ACTIVATE',
              }
            })
          )
        });

        // Simply dispatch a deactivate event.
        collapse.addEventListener('click', () => {
          element.dispatchEvent(new CustomEvent('component:deactivate'));
        });
      });
    });
})(cms);
