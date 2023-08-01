/**
 * @file
 * Provides a performant focus-visible polyfill loader.
 */
(cms => {
  cms.attach('polyfillFocusVisible', context => {
    if (context !== document) {
      return;
    }

    const style = document.createElement('style');
    document.head.appendChild(style);
    try {
      style.sheet.insertRule(':focus-visible { color: initial }');
      style.sheet.deleteRule(0);
    }
    catch (e) {
      const script = document.createElement('script');
      script.src = cms.vendor_dir + '/focus-visible/dist/focus-visible.min.js';
      document.body.appendChild(script);
    }
    finally {
      document.head.removeChild(style);
    }
  });
})(cms);
