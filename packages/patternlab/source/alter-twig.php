<?php

use Twig\Environment;
use Twig\TwigFunction;

require_once('packages/smart-datetime/SmartDatetime.php');
require_once('packages/random-item/RandomItem.php');

function addCustomExtension(Environment $env) {
    $env->addExtension(new SmartDatetimeExtension);
    $env->addExtension(new RandomItemExtension);
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

