/**
 * @file
 * Provides section view tracking.
 */
(cms => {
  cms.attach('sectionViewTracking', context => {

    // On page load, if there's no hash in the URL, or if there is a hash, but
    // no corresponding element, track a "Header" view.
    if (context === document) {
      if (!location.hash || !document.querySelector(location.hash)) {
        const datalayer = window.dataLayer || [];
        datalayer.push({
          event: 'section_view',
          section_view_title: 'Header',
        });
      }
    }

    // Any time that an interactive component is activated, check to see if it
    // is contained by an attribute that has a 'data-section' attribute.  If
    // so, track a view to the section that contains the interactive component.
    const components = context.querySelectorAll('[data-interactive-component]');
    components.forEach(component => {
      component.addEventListener('component:activated', () => {
        const section = component.closest('[data-section]');
        if (section) {
          const datalayer = window.dataLayer || [];
          datalayer.push({
            event: 'section_view',
            section_view_title: section.getAttribute('data-section'),
          });
        }
      });
    });
  });
})(cms);
