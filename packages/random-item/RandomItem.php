<?php

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

/**
 * Defines custom twig functions.
 */
class RandomItemExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return parent::getFilters() + [
      new TwigFilter('clean_unique_id', [$this, 'getUniqueId']),
    ];
  }

  /**
   * Calls through to the php uniqid function to generate
   * a unique identifying string.
   *
   * @param $identifier
   *   The string to create unique identifiers for.
   *
   * @return string
   *   The unique ID of the element.
   */
    public function getUniqueId($identifier) {
      return uniqid($identifier);
    }

}
