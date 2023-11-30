/**
 * @file
 * Provides a light-weight, performant slide toggle replacement.
 */
((cms) => {

  /**
   * A "transitionend" callback that removes the inline height css property.
   *
   * @param {TransitionEvent} e - the event that triggered the callback.
   */
  function removeHeight(e) {
    const target = e.target;
    target.removeEventListener('transitionend', removeHeight);
    target.style.height = null;
    target.style.overflow = '';
    console.log('removeHeight called');
  }

  /**
   * Collapses an element to 0px in height.
   *
   * This works by first setting the height to a static value that is
   * equivalent to the 'auto' value and then on the next animation frame
   * setting the height to '0px'.  This causes the transition to occur from
   * a static value to '0px' while never letting the end user see that the
   * height has been swapped out.
   *
   * @param {HTMLElement} target - the element to collapse.
   */
  cms.collapse = target => {
    const height = target.scrollHeight;
    const transition = window.getComputedStyle(target).getPropertyValue('transition');
    target.style.transition = '';
    target.style.overflow = 'hidden';
    target.removeEventListener('transitionend', removeHeight);
    requestAnimationFrame(function() {
      target.style.height = height + 'px';
      target.style.transition = transition;

      requestAnimationFrame(function() {
        target.style.height = '0px';
      });
    });
  };

  /**
   * Expands an element to its natural height.
   *
   * This works by temporarily setting the target element's height equal to
   * the value of its 'scrollHeight' property.  This allows for a CSS
   * transition between 0px and a static value.  Finally, when the transition
   * ends, the inline 'height' style is removed so the element can then have
   * its height managed automatically.
   *
   * @param {HTMLElement} target - the element to expand.
   */
  cms.expand = target => {
    const height = target.scrollHeight;
    target.style.height = height + 'px';
    target.addEventListener('transitionend', removeHeight);
  };
})(cms);
