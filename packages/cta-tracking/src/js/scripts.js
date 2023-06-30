((cms) => {

  cms.attach('cta', context => {

    // This click listener is assigned to a variable so that it can be
    // referenced from within itself.  When this listener is invoked, it
    // cancels the original event, then after the promise finishes, the
    // listener removes itself from the triggering element, re-fires a click
    // event, and finally re-adds itself.
    const synchronous_listener = (event) => {
      // Check to see if analytics.js is loaded.
      if (typeof window.dataLayer === 'object' && window.dataLayer?.push !== Array.prototype.push) {
        event.preventDefault();

        const cta = event.target;

        const callbacks = [];

        // This promise acts as a 'worst case scenario' fallback that can happen
        // if something catastrophic happens, like the container ID being changed
        // unexpectedly, or if the GTM library fails to trigger its own internal
        // timeout.
        callbacks.push(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('A synchronous datalayer event failed to complete within the maximum UX threshold. Check GTM to ensure there are no poorly performing tags.'));
            }, 100);
          })
        );

        // This promise will resolve when the event callback is invoked by the
        // appropriate GTM container.
        callbacks.push(
          new Promise(function(resolve) {
            window.dataLayer.push({
              'event': 'cta-track',
              'cta-description': cta.getAttribute('data-cta-description') ?? 'unknown',
              'cta-placement': cta.getAttribute('data-cta-placement') ?? 'unknown',

              'eventCallback': function(container_id) {
                if (container_id === cms.gtm_container_id) {
                  resolve();
                }
              },
            });
          })
        );

        // When either scenario resolves, re-trigger the original event.
        Promise.race(callbacks).finally(() => {

          // Remove this event.
          cta.removeEventListener('click', synchronous_listener);

          // Re-trigger the original event, minus this listener.
          cta.click();

          // Re-add this event.
          cta.addEventListener('click', synchronous_listener);
        });
      }
    };

    // Set up synchronous tracking.
    const tracked_ctas_sync = context.querySelectorAll('[data-cta-track-sync]');
    tracked_ctas_sync.forEach(cta => {
      cta.addEventListener('click', synchronous_listener);
    });

    // Set up asynchronous tracking.
    const tracked_ctas_async = context.querySelectorAll('[data-cta-track-async]');
    tracked_ctas_async.forEach(cta => {
      cta.addEventListener('click', () => {
        window.dataLayer.push({
          'event': 'cta-track',
          'cta-description': cta.getAttribute('data-cta-description') ?? 'unknown',
          'cta-placement': cta.getAttribute('data-cta-placement') ?? 'unknown',
        });
      });
    });
  });
})(cms);


