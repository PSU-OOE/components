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
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'section_view',
            section_view_title: 'Header',
          });
        }
      }
    }

    const components = cms.once('sectionViewTracking', '[data-interactive-component]', context);

    components.forEach(component => {
      component.addEventListener('component:activate', e => {
        if (e.detail.activation_type !== 'AUTO_EXPAND') {
          const section = component.closest('[data-section]');
          if (section && section !== current_section) {
            current_section = section;
            window.dataLayer = window.dataLayer || [];

            try {
              let tags = JSON.parse(current_section.getAttribute('data-section-tags') ?? '{}');
              tags.activation_type = e.detail.activation_type;
              window.dataLayer.push({
                event: 'section_view',
                section_view_title: current_section.getAttribute('data-section'),
                tags: tags,
              });
            }
            catch(error) {
              // Prevent unwinding the stack; log the error and continue on.
              console.error(error);
            }
          }
        }
      });
    });

  });
})(cms);
