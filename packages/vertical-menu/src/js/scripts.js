(cms => {
  cms.attach('verticalMenu', context => {
    const menus = cms.once('verticalMenu', '.vertical-menu', context);
    menus.forEach(menu => {
      const toggles = menu.querySelectorAll('.vertical-menu__toggle');
      toggles.forEach(toggle => {
        const submenu = toggle.parentElement.querySelector('.vertical-menu__menu');
        toggle.addEventListener('click', () => {
          if (toggle.getAttribute('aria-expanded') === 'true') {
            cms.collapse(submenu);
            toggle.setAttribute('aria-expanded', 'false');
          }
          else {
            cms.expand(submenu);
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  });
})(cms);
