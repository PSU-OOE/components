<?php

use Twig\Environment;
use Twig\TwigFunction;
use Twig\TwigFilter;

require_once('packages/smart-datetime/SmartDatetime.php');

function addCustomExtension(Environment $env) {
    $env->addExtension(new SmartDatetimeExtension);
    $env->addFilter(new TwigFilter('clean_unique_id', function($id) { return $id . '-' . uniqid(); }));

    $env->addFunction(new TwigFunction('get_component_stylesheets', function () {
        $styles = '';
        foreach (glob('packages/*/dist/styles.css') as $component) {
            $styles .= file_get_contents($component);
        }
        return $styles;
    }));

    $env->addFunction(new TwigFunction('get_component_scripts', function () {
        $scripts = '';
        foreach (glob('packages/*/dist/scripts.js') as $component) {
            $scripts .= file_get_contents($component);
        }
        return $scripts;
    }));

    $env->addFunction(new TwigFunction('get_sprites', function() {
        return file_get_contents('packages/sprite/dist/sprites.svg');
    }));
}

