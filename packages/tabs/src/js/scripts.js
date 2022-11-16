(cms => {
  cms.attach('tabs', context => {
    const tabs_elements = context.querySelectorAll('.tabs');

    tabs_elements.forEach(tabs_element => {
      const panels = tabs_element.querySelectorAll('.tabs__panel');
      panels.forEach(panel => {
        panel.addEventListener('component:activate', () => {
          console.debug('Request to activate tab panel ' + panel.id + ' was received.');
          const target = tabs_element.querySelector('[aria-controls="' + panel.getAttribute('id') + '"]');
          if (target.getAttribute('aria-selected') === 'false') {
            const buttons = tabs_element.querySelectorAll('.tabs-list__button');

            // Revalidate the states of each button / panel.
            buttons.forEach(sibling => {
              const panel_id = sibling.getAttribute('aria-controls');
              const sibling_panel = tabs_element.querySelector('#' + panel_id);
              // If the current button is not the one that was clicked, then set
              // aria-selected to false and hide the associated panel.
              if (target !== sibling) {
                sibling_panel.dispatchEvent(new CustomEvent('component:deactivate', {detail: {target: sibling_panel}}));
              }
              else {
                // If the current button was clicked, make sure it was not previously
                // selected before changing any states.
                if(target.getAttribute('aria-selected') !== 'true') {
                  sibling.setAttribute('aria-selected', 'true');
                  sibling.setAttribute('tabindex', '');
                  sibling_panel.classList.add('tabs__panel--active');
                  panel.dispatchEvent(new CustomEvent('component:activated', { detail: {target: target } }));
                }
              }
            });
            console.debug('Tab panel ' + panel.id + ' has been activated.');
          }
          else {
            console.debug('Tab panel ' + panel.id + ' was already activated.');
          }
        });

        panel.addEventListener('component:deactivate', () => {
          console.debug('Request to deactivate tab panel ' + panel.id + ' was received.');
          const button = context.querySelector('[aria-controls="' + panel.getAttribute('id') + '"]');
          if (button.getAttribute('aria-selected') === 'true') {
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
            panel.classList.remove('tabs__panel--active');
            panel.dispatchEvent(new CustomEvent('component:deactivated'));
            console.debug('Tab panel ' + panel.id + ' has been deactivated.');
          }
          else {
            console.debug('Tab panel ' + panel.id + ' was already deactivated.');
          }
        });
      });
    });
  });

})(cms);
