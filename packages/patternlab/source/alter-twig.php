<?php

use Twig\Environment;
use Twig\TwigFunction;

require_once('packages/smart-datetime/SmartDatetime.php');

function addCustomExtension(Environment $env) {
  $package_manifest = json_decode(file_get_contents('packages/patternlab/package.json'), TRUE);
    $env->addExtension(new SmartDatetimeExtension);
    $dependencies = $package_manifest['dependencies'];
    $env->addFunction(new TwigFunction('get_component_stylesheets', function () use ($dependencies) {
        $styles = '';
        foreach (array_keys($dependencies) as $dependency) {
          $component = str_replace('@psu-ooe/', '', $dependency);
          $css_file = "packages/$component/dist/styles.css";
          if (file_exists($css_file)) {
            $styles .= file_get_contents($css_file);
          }
        }
        return $styles;
    }));

    $env->addFunction(new TwigFunction('get_component_scripts', function () use ($dependencies) {
        $scripts = '';
      foreach (array_keys($dependencies) as $dependency) {
        $component = str_replace('@psu-ooe/', '', $dependency);
        $js_file = "packages/$component/dist/scripts.js";
        if (file_exists($js_file)) {
          $scripts .= file_get_contents($js_file);
        }
      }
        return $scripts;
    }));

    $env->addFunction(new TwigFunction('get_sprites', function() {
        return file_get_contents('packages/sprite/dist/sprites.svg');
    }));
}

