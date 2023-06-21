((cms) => {
  const listener = (event) => {
    // Check to see if analytics.js is loaded.
    if (typeof window.dataLayer === 'object' && window.dataLayer?.push !== Array.prototype.push) {
      event.preventDefault();

      const tracked_cta = event.target;

      window.dataLayer.push({
        'event': 'cta-track',
        'cta-description': tracked_cta.getAttribute('data-cta-description') ?? 'unknown',
        'cta-placement': tracked_cta.getAttribute('data-cta-placement') ?? 'unknown',
        'eventCallback': () => {

          // Remove this event.
          tracked_cta.removeEventListener('click', listener);

          // Re-trigger the original event.
          tracked_cta.click();

          // Re-add this event.
          tracked_cta.addEventListener('click', listener);
        },
        'eventTimeout': 2000,
      });
    }
  };

  cms.attach('cta', context => {
    const tracked_ctas = context.querySelectorAll('[data-cta-track]');
    tracked_ctas.forEach(tracked_cta => {
      tracked_cta.addEventListener('click', listener);
    });
  });
})(cms);
