<?php

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

/**
 * Defines custom twig functions.
 */
class SmartDatetimeExtension extends AbstractExtension {

    /**
     * {@inheritdoc}
     */
    public function getFunctions() {
        return parent::getFunctions() + [
                new TwigFunction('get_date_range_metadata', [$this, 'getDateRangeMetaInfo']),
            ];
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters() {
        return parent::getFilters() + [
                new TwigFilter('cast_to_datetime', [$this, 'castToDatetime']),
            ];
    }

    /**
     * Casts the provided date argument to a Datetime object.
     *
     * @param string|\Datetime $date
     *   The date to cast.
     * @param $timezone
     *   The timezone to use while casting.
     *
     * @return \DateTime
     *   A datetime object.
     *
     * @throws \Exception
     *   If the provided date and timezone cannot be cast to a datetime.
     */
    public function castToDatetime($date, $timezone) {
        if (!($date instanceof \DateTime)) {
            return new \DateTime($date, new \DateTimeZone($timezone));
        }
        return $date;
    }

    /**
     * Gets a series of data attributes for date-range meta-information.
     *
     * @param \DateTime $start
     *   The start of the range.
     * @param \DateTime $end
     *   The end of the range.
     *
     * @return array|string[]
     *   An array of attributes.
     *
     * @throws \Exception
     *   If a malformed start or end datetime is provided.
     */
    public function getDateRangeMetaInfo(\DateTime $start, \DateTime $end) {
        $attributes = [];
        if ($start->getTimestamp() === $end->getTimestamp()) {
            $attributes[] = 'data-same-datetime';
        }
        if ($start->format('T') === $end->format('T')) {
            $attributes[] = 'data-same-timezone';
        }
        if ($start->format('i') === '00') {
            $attributes[] = 'data-start-on-the-hour';
        }
        if ($end->format('i') === '00') {
            $attributes[] = 'data-end-on-the-hour';
        }
        if ($start->format('Y') === $end->format('Y')) {
            if ($start->format('F') === $end->format('F')) {
                if ($start->format('j') === $end->format('j')) {
                    $attributes[] = 'data-same-day';

                    if ($start->format('a') === $end->format('a')) {
                        $attributes[] = 'data-same-meridiem';
                    }
                }
                else {
                    $attributes[] = 'data-same-month';
                }
            }
            else {
                $attributes[] = 'data-same-year';
            }
        }
        return $attributes;
    }
}
