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
      button.addEventListener('click', () => {

        // Update the transition duration for the open/close animation.
        const transition = Math.max(content.scrollHeight / 2, 200) + 'ms';
        button.querySelector('.accordion__sprite .sprite').style['transition-duration'] = transition;
        content.style['transition-duration'] = transition;

        const state = button.getAttribute('aria-expanded');
        if (state === 'true') {
          accordion.classList.remove('accordion--expanded');
          button.setAttribute('aria-expanded', 'false');
          cms.collapse(content);
        }
        else {
          accordion.classList.add('accordion--expanded');
          button.setAttribute('aria-expanded', 'true');
          cms.expand(content);
        }
      });
    });
  });
})(cms);
