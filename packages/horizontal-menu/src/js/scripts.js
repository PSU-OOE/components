(cms => {
  cms.attach('horizontalMenu', context => {
    const menus = cms.once('horizontalMenu', '.horizontal-menu', context);
    menus.forEach(menu => {
      const toggles = menu.querySelectorAll('.horizontal-menu__toggle');
      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const old_state = toggle.getAttribute('aria-expanded');
          toggle.setAttribute('aria-expanded', old_state === 'true' ? 'false' : 'true');
        });
      });

      const submenus = menu.querySelectorAll('.horizontal-menu__item');
      submenus.forEach(submenu => {
        const toggle = submenu.querySelector('.horizontal-menu__toggle');
        if (toggle) {

          let delayed_hover_enter = null;
          let delayed_hover_exit = null;
          // Turn on 'aria-expanded' on hover.
          submenu.addEventListener('mouseenter', () => {
            if (delayed_hover_exit) {
              clearTimeout(delayed_hover_exit);
              delayed_hover_exit = null;
            }
            delayed_hover_enter = setTimeout(() => {
              toggle.setAttribute('aria-expanded', 'true');
              delayed_hover_enter = null;
            }, 200);
          });

          // Turn off 'aria-expanded' on leave.
          submenu.addEventListener('mouseleave', () => {
            if (delayed_hover_enter) {
              clearTimeout(delayed_hover_enter);
              delayed_hover_enter = null;
            }
            delayed_hover_exit = setTimeout(() => {
              if (!submenu.contains(document.activeElement)) {
                toggle.setAttribute('aria-expanded', 'false');
              }
            }, 200);
          });

          // Turn off 'aria-expanded' on focus out.
          submenu.addEventListener('focusout', () => {
            if (!submenu.contains(event.relatedTarget)) {
              toggle.setAttribute('aria-expanded', 'false');
            }
          });
          // Turn off 'aria-expanded' on escape key press.
          menu.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
              toggle.setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
  });
})(cms);
