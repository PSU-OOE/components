(cms => {

  const resize_observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const a11y_table = entry.target;
      entry.target.style['height'] = 'auto';
      requestAnimationFrame(() => {
        entry.target.style['height'] = a11y_table.offsetHeight + 'px';
      });
    });
  });

  cms.attach('a11y-tables', context => {
    const a11y_tables = context.querySelectorAll('.a11y-table');

    a11y_tables.forEach(a11y_table => {
      resize_observer.observe(a11y_table);
    });
  });

  cms.detach('a11y-tables', context => {
    const a11y_tables = context.querySelectorAll('.a11y-table');

    a11y_tables.forEach(a11y_table => {
      resize_observer.unobserve(a11y_table);
    });
  });
})(cms);
