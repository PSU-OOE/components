/**
 * @file
 * Provides a generic mechanism to react to the chaotic nature of flex wrap.
 */
(cms => {

  /**
   * Are each of the items on the same row?
   *
   * @param {Array.<Element>} items
   *   The HTML elements to check.
   *
   * @returns {boolean}
   *   True if all items are on the same row, otherwise false.
   */
  function all_in_same_row(items) {
    let all_on_same_line = true;
    const first_offset_top = items[0].offsetTop;
    for (let i = 1; i < items.length; ++i) {
      if (items[i].offsetTop !== first_offset_top) {
        all_on_same_line = false;
        break;
      }
    }
    return all_on_same_line;
  }

  /**
   * Are each of the items on a different row?
   *
   * @param {Array.<Element>} items
   *   The HTML elements to check.
   *
   * @returns {boolean}
   *   True if all items are on a different row, otherwise false.
   */
  function all_in_different_rows(items) {
    let all_on_different_lines = true;
    let current_offset_top = items[0].offsetTop;
    for (let i = 1; i < items.length; ++i) {
      const next_offset_top = items[i].offsetTop;
      if (next_offset_top === current_offset_top) {
        all_on_different_lines = false;
        break;
      }
      current_offset_top = next_offset_top;
    }
    return all_on_different_lines;
  }

  /**
   * Have any items wrapped (or unwrapped) to different rows?
   *
   * @param {Element[]} items
   *   The HTML elements to check.
   *
   * @returns {boolean}
   *   True if any items have changed rows, otherwise false.
   */
  function any_wrapping_has_changed(items) {
    let changed = false;
    let row = 0;
    for (let index = 1; index < items.length; ++index) {
      const item = items[index];
      const old_row = item.hasAttribute('data-flex-row') ? parseInt(item.getAttribute('data-flex-row'), 10) : 0;
      const offset_top = item.offsetTop;
      if (items[index - 1].offsetTop < offset_top) {
        ++row;
      }

      if (!item.hasAttribute('data-flex-row') || row !== old_row) {
        item.setAttribute('data-flex-row', row.toString(10));
        changed = true;
      }
    }
    return changed;
  }

  /**
   * Revalidates flex wrapping for a particular target.
   *
   * @param {HTMLElement} target
   *   The target to revalidate.
   */
  function revalidateFlexWrapping(target) {
    const items = Array.from(target.children);
    const old_mode = target.getAttribute('data-flex-mode');

    const original_item_rows = items.map(item => parseInt(item.getAttribute('data-flex-row'), 10));

    // Temporarily let the container flex to allow us to check the natural
    // state of the flex wrapping.
    target.style['flex-flow'] = 'row wrap';
    target.removeAttribute('data-flex-mode');
    // If any wrapping states have changed or if the target is uninitialized.
    if (any_wrapping_has_changed(items) || !old_mode) {

      let new_mode = 'mixed';

      // All of the items have moved onto the same line.
      if (old_mode !== 'horizontal' && all_in_same_row(items)) {
        new_mode = 'horizontal';
      }
      // All of the items have moved onto their own lines.
      else if (old_mode !== 'vertical' && all_in_different_rows(items)) {
        new_mode = 'vertical';
      }

      // Dispatch events to any items that have changed rows.
      items.forEach((item, index) => {
        const old_row = Number.isInteger(original_item_rows[index]) ? original_item_rows[index] : null;
        const new_row = parseInt(item.getAttribute('data-flex-row'), 10);

        if (old_row !== new_row) {
          const row_changed = new CustomEvent('flex-item-row-change', {
            detail: {
              old_row: old_row,
              new_row: new_row,
            },
          });
          item.dispatchEvent(row_changed);
        }
      });

      // If items have entered a new state, dispatch events to let things know.
      if (old_mode !== new_mode) {
        target.dispatchEvent(
          new CustomEvent('flex-mode-change', {
            detail: {
              old_mode: old_mode,
              new_mode: new_mode,
            },
          })
        );
        target.setAttribute('data-flex-mode', new_mode);
      }
    }
    else {
      target.setAttribute('data-flex-mode', old_mode);
    }

    // Remove the temporary style how that we're done with the calculations.
    target.style['flex-flow'] = '';
  }

  /**
   * A mutation observer instance shared among all flex-wrap-aware elements.
   *
   * @type {MutationObserver}
   */
  const mutation_observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      let target = mutation.target;
      if (mutation.type === 'childList') {
        target = target.closest('[data-flex-wrap-aware]');
      }
      else if (mutation.type === 'characterData') {
        target = target.parentElement.closest('[data-flex-wrap-aware]');
      }
      revalidateFlexWrapping(target);
    }
  });

  /**
   * The mutation observer configuration.
   *
   * @type {{subtree: boolean, attributes: boolean, childList: boolean, characterData: boolean}}
   */
  const mutation_config = {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true,
  };

  /**
   * Starts observing all flex-wrap-aware elements with the current context.
   */
  cms.attach('flexWrapListener', context => {

    /**
     * A resize observer instance shared among all flex-wrap-aware elements.
     *
     * @type {ResizeObserver}
     */
    const resize_observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        revalidateFlexWrapping(entry.target);
      }
    });

    const elements = context.querySelectorAll('[data-flex-wrap-aware]');
    const init_first_item = new CustomEvent('flex-item-row-change', {
      detail: {
        old_row: null,
        new_row: 0,
      },
    });

    elements.forEach(element => {

      // The first tab will always exist in the top row!
      const first_item = element.firstElementChild;
      first_item.setAttribute('data-flex-row', '0');
      first_item.dispatchEvent(init_first_item);

      resize_observer.observe(element);
      mutation_observer.observe(element, mutation_config);
    });
  });

})(cms);
