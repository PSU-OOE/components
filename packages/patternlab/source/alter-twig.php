<?php

use Twig\Environment;
use Twig\TwigFunction;

function addCustomExtension(Environment $env) {
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

