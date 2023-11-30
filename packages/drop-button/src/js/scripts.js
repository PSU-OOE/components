(cms => {

  let last_registry_update = Date.now();
  let drop_button_registry = [];
  const px_to_rems_conversion = parseFloat(getComputedStyle(document.documentElement).fontSize);

  // Under certain circumstances the drop-button panels are required to span
  // across the entire viewport horizontal dimension.  Since the panel is
  // relative to the button, and we want to position the bubble relative to
  // the viewport, we use javascript to provide the additional positioning
  // information as a custom property.  Using this information, CSS can
  // effectively translate the relative coordinates by an appropriate amount
  // in order to mimic viewport positioning quite well.
  const revalidate_registry = (viewport_width) => {
    const now = Date.now();
    if (now - last_registry_update < 1000) {
      console.warn('Dropbutton registry revalidation is happening too rapidly; something is wrong.');
    }
    last_registry_update = Date.now();
    drop_button_registry.forEach(drop_button => {
      const toggle = drop_button.querySelector('.drop-button__toggle');
      if (toggle.getAttribute('aria-expanded') !== 'true') {
        return;
      }
      const bounds = drop_button.getBoundingClientRect();
      console.log(viewport_width);
      if (viewport_width < 800) {
        drop_button.style.setProperty('--drop-button--left', -((bounds.left - 5) / px_to_rems_conversion) + 'rem');
        drop_button.style.setProperty('--drop-button--right', -((viewport_width - bounds.right - 5) / px_to_rems_conversion) + 'rem');
      }
      else {
        const viewport_center = viewport_width / 2;
        const dropbutton_center = bounds.left + ((bounds.right - bounds.left) / 2);
        // If the center of the dropbutton is further left than the center of
        // the viewport, then the panel must open to the right.
        if (dropbutton_center < viewport_center) {
          // 28rem - width of dropbutton - dropbutton--left
          drop_button.style.setProperty('--drop-button--left', (-35 / px_to_rems_conversion) + 'rem');
          drop_button.style.setProperty('--drop-button--right', ((-240 + bounds.width) / px_to_rems_conversion) + 'rem');
          drop_button.style.setProperty('--drop-button--right', ((-240 + bounds.width) / px_to_rems_conversion) + 'rem');
        }
        else {
          drop_button.style.setProperty('--drop-button--left', ((-240 + bounds.width) / px_to_rems_conversion) + 'rem');
          drop_button.style.setProperty('--drop-button--right', (-35 / px_to_rems_conversion) + 'rem');
        }
      }
    });
  };

  // Whenever the body changes size under 950px, be sure to revalidate all
  // drop-buttons that are present in the registry, as their position relative
  // to the viewport will have almost certainly changed.
  (new ResizeObserver(entries => {
    entries.forEach(entry => {
      revalidate_registry(document.body.clientWidth)
    });
  })).observe(document.body);

  // Whenever the body size is under 950px and any element is mutated, be sure
  // to revalidate all drop-buttons that are present in the registry, as their
  // position relative to the viewport may have changed.
  const mutation_observer = new MutationObserver((mutationList) => {

    // Since registry revalidation will certainly involve mutating DOM
    // elements, we have to disconnect the observer and subsequently
    // reconnect it after we're done mucking around with things.  This is a
    // critical step, as failing to do so would result in infinite loops!
    mutation_observer.disconnect();
    revalidate_registry(document.body.clientWidth);
    mutation_observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true});
  });

  mutation_observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true});

  // Whenever the drop-button panel intersects with the viewport, be sure
  // to revalidate all drop-buttons that are present in the registry, as their
  // position relative to the viewport have changed.
  const intersection_observer = new IntersectionObserver(entries => {
    const width = document.body.clientWidth;

    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        const panel = entry.target;
        const drop_button = panel.closest('.drop-button');
        const bounds = drop_button.getBoundingClientRect();
        intersection_observer.unobserve(panel);
        drop_button.style.setProperty('--drop-button--left', -(bounds.left / px_to_rems_conversion) + 'rem');
        drop_button.style.setProperty('--drop-button--right', '-' + ((width - bounds.right) / px_to_rems_conversion) + 'rem');
        intersection_observer.observe(panel);
      }
    });
  }, { threshold: 1.0, root: document.body });

  // Remove all drop-buttons from the registry that are being detached.
  cms.detach('dropbutton', context => {
    const drop_buttons = context.querySelectorAll('.drop-button');
    drop_buttons.forEach(removal => {
      const panel = removal.querySelector('.drop-button__content');
      intersection_observer.unobserve(panel);
      drop_button_registry = drop_button_registry.filter(candidate => {
        return candidate !== removal;
      });
    });
  });

  cms.attach('dropbutton', context => {
    const drop_buttons = cms.once('dropbutton', '.drop-button', context);
    drop_buttons.forEach(drop_button => {
      drop_button_registry.push(drop_button);
      const toggle = drop_button.querySelector('.drop-button__toggle');
      const panel = drop_button.querySelector('.drop-button__content');
      intersection_observer.observe(panel);
      // Toggle the expanded state of drop-button menus on click.
      toggle.addEventListener('click', () => {
        if (document.activeElement !== toggle) {
          toggle.focus();
        }

        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
        else {
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      // @TODO: This is a hack needed for hacky Safari
      toggle.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          if (toggle.getAttribute('aria-expanded') === 'true') {
            toggle.setAttribute('aria-expanded', 'false');
          }
          else {
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });

      // Close an open drop-button menu when escape is pressed.
      drop_button.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close an open drop-button menu when focus leaves the component.
      drop_button.addEventListener('focusout', (e) => {
        if (!drop_button.contains(e.relatedTarget)) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
})(cms);
