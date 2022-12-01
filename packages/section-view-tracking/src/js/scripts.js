/**
 * @file
 * Provides section view tracking.
 */
(cms => {

  let current_section = null;

  const revalidate_section_view = component => {
    const section = component.closest('[data-section]');
    if (section && section !== current_section) {
      current_section = section;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'section_view',
        section_view_title: current_section.getAttribute('data-section'),
      });
    }
  };

  cms.attach('sectionViewTracking', context => {

    if (context === document) {
      const hash = location.hash;
      // Only track a Header event if...
      // There is a not a fragment or:
      //   there is a fragment and
      //   the navigation type is "navigate" and
      //   there is no corresponding element on the page.
      if (!hash || (performance.getEntriesByType('navigation')[0].type === 'navigate' && !document.querySelector(hash))) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'section_view',
          section_view_title: 'Header',
        });
      }
    }

    const components = context.querySelectorAll('[data-interactive-component]');
    components.forEach(component => {
      component.addEventListener('component:activate', e => {
        revalidate_section_view(component);
      });
    });
  });
})(cms);
