(cms => {
  cms.attach('open-search', context => {
    const open_searches = context.querySelectorAll('.open-search');
    open_searches.forEach(open_search => {
      const fuse_sources = [];
      const sources = JSON.parse(open_search.getAttribute('data-search-config'));
      const close = open_search.querySelector('.open-search__close');
      const result = open_search.querySelector('.open-search__results');
      const input = open_search.querySelector('.open-search__input');

      const identifier = open_search.getAttribute('data-search-identifier');
      if (sources && identifier) {
        /**
         * Iterate over each element that is configured to emit search events.
         */
        Object.keys(sources).forEach(function (source) {

          const config = sources[source];
          // Create an object that contains a source and a fuse object with
          // the object properties defined in the DOM.

          const data = cms.data(source);
          const fuse_source = {
            "source": source,
            "fuse": new Fuse(Object.values(data), {
              keys: config.fuse_configuration.keys,
              threshold: config.fuse_configuration.threshold,
              minMatchCharLength: config.fuse_configuration.minMatchCharLength,
              useExtendedSearch: config.fuse_configuration.useExtendedSearch,
              distance: config.fuse_configuration.distance,
            }),
            "operator": config.logical_operator,
          };

          fuse_sources.push(fuse_source);

        });

        let timer;
        let datalayer_timer;
        const search_input = context.querySelector('[data-search-identifier="'+identifier+'"]');
        search_input.addEventListener('input', e => {
          clearTimeout(timer);
          clearTimeout(datalayer_timer);
          timer = setTimeout(e => {
            dispatchSearchEvents(search_input, fuse_sources, open_search);
          }, 300);

          datalayer_timer = setTimeout(e => {
            dispatchDatalayerSearchEvents(search_input, fuse_sources, open_search);
          }, 1500);
        });
      }

      /**
       * When the close search button is clicked, we need to reset things.
       * Reset the input value, clear out all elements that were added,
       * and adjust classing to the results container and the close button.
       */
      close.addEventListener('click', e => {
        focusout(e);
        input.value = '';
        result.querySelectorAll('*').forEach(e => {
          e.remove();
        });
        result.classList.remove('active');
        open_search.classList.remove('open-search--open');

      });

      /**
       * When the user focuses into the search input,
       * adjust the classing of the search container, close button,
       * and display block on the results.
       */
      open_search.addEventListener('focusin', e => {
        open_search.classList.add('open-search--open');
        result.style.display = 'block';
      });

      /**
       * When the search container (and its children) lose focus:
       *
       * If there is a value in the input, just hide the results but
       * not reset any of the controls.
       *
       * If there is not a value in the input, remove classing
       * from the search input, the close button, and remove all
       * elements that were added to the results container.
       */
      open_search.addEventListener('focusout', e => {
        focusout(e);
      });

      /**
       * Function called when the user focuses out
       * or closes the search.
       *
       * @param e
       *   focusout | click event
       *
       */
      const focusout = function(e) {
        if (!open_search.contains(e.relatedTarget)) {
          if (input.value.length === 0) {
            open_search.classList.remove('open-search--open');
            result.querySelectorAll('*').forEach(e => {
              e.remove();
            });
          }
          result.style.display = 'none';
        }
      }

      open_search.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          result.style.display = 'none';
        }
      });
    });

    /**
     * Helper function to perform fuse searches and return
     * results as an object.
     *
     * @param search_input
     *   The string that is to be searched.
     * @param fuse_sources
     *   An array of fuse configuration sources.
     * @param open_search
     *   The HTML Dom element of the search container.
     *
     * @returns {*[]}
     */
    function performFuseSearches(search_input, fuse_sources, open_search) {
      let fuse_results = [];

      fuse_sources.forEach(function (fuse_source) {
        let search_value = open_search.querySelector('.open-search__input').value;
        if (fuse_source.operator === 'or') {
          search_value = search_value.replace(' ', '|');
        }

        fuse_results.push({
          'source': fuse_source.source,
          'results': fuse_source.fuse.search(search_value),
          'search_string': search_value,
        });

      });
      return fuse_results;
    }

    /**
     * Helper function used to dispatch custom events
     * when the search results should be pushed to the datalayer.
     *
     * @param search_input
     *   The string that is to be searched.
     * @param fuse_sources
     *   An array of fuse configuration sources.
     * @param open_search
     *   The HTML Dom element of the search container.
     *
     */
    function dispatchDatalayerSearchEvents(search_input, fuse_sources, open_search) {

      const search_results = performFuseSearches(search_input, fuse_sources, open_search);

      open_search.dispatchEvent(new CustomEvent('open-search:datalayer_searches_performed', {
        detail: {
          searches: search_results,
        }
      }));
    }

    /**
     * Helper function used to dispatch custom events
     * with the search configurations and search results.
     *
     * @param search_input
     *   The string that is to be searched.
     * @param fuse_sources
     *   An array of fuse configuration sources.
     * @param open_search
     *   The HTML Dom element of the search container.
     *
     */
    function dispatchSearchEvents(search_input, fuse_sources, open_search) {

      const search_results = performFuseSearches(search_input, fuse_sources, open_search);

      open_search.dispatchEvent(new CustomEvent('open-search:searches_performed', {
        detail: {
          searches: search_results,
        }
      }));

      search_results.forEach(function(search) {
        open_search.dispatchEvent(new CustomEvent('open-search:search_performed', {
          detail: {
            source: search.source,
            results: search.results,
            search_string: search.search_string,
          },
        }));
      });

    }
  })
})(cms);
