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

    // On page load, if there's no hash in the URL, or if there is a hash, but
    // no corresponding element, track a "Header" view.
    if (context === document) {
      if (!location.hash || !document.querySelector(location.hash)) {
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
