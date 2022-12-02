/**
 * @file
 * Provides section view tracking.
 */
(cms => {

  let current_section = null;

  cms.attach('sectionViewTracking', context => {

    if (context === document) {

      // @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type
      const navigation_type = performance.getEntriesByType('navigation')[0].type;

      // Exclude back/forward, reload, and pre-render navigation types.
      if (navigation_type === 'navigate') {
        const hash = location.hash;

        // Only track a "Header" view if there is no fragment, or an invalid fragment.
        if (!hash || !document.querySelector(hash)) {
          console.log(performance.getEntriesByType('navigation')[0].type);
          console.log(hash);
          console.log('pushed header');
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'section_view',
            section_view_title: 'Header',
          });
        }
      }
    }

    const components = context.querySelectorAll('[data-interactive-component]');

    components.forEach(component => {
      component.addEventListener('component:activate', () => {
        const section = component.closest('[data-section]');
        if (section && section !== current_section) {
          current_section = section;
          console.log('pushed ' + current_section.getAttribute('data-section'));
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'section_view',
            section_view_title: current_section.getAttribute('data-section'),
          });
        }
      });
    });

  });
})(cms);
