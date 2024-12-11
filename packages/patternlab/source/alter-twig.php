<?php

use Twig\Environment;
use Twig\TwigFunction;
use Twig\TwigFilter;

require_once('packages/smart-datetime/SmartDatetime.php');

function moveKeyBefore($arr, $find, $move) {
  if (!isset($arr[$find], $arr[$move])) {
    return $arr;
  }

  $elem = [$move=>$arr[$move]];  // cache the element to be moved
  $start = array_splice($arr, 0, array_search($find, array_keys($arr), TRUE));
  unset($start[$move]);  // only important if $move is in $start
  return $start + $elem + $arr;
}

  function addCustomExtension(Environment $env) {
    $env->addExtension(new SmartDatetimeExtension);
    $env->addFilter(new TwigFilter('clean_unique_id', function($id) {
        $id = str_replace(' ', '-', $id);
        return $id . '-' . uniqid();
    }));

    $env->addFunction(new TwigFunction('get_component_stylesheets', function () {
      $manifests = [];
      foreach (glob('packages/*/package.json') as $manifest) {
        $manifest_json = json_decode(file_get_contents($manifest), TRUE, 512, JSON_THROW_ON_ERROR);
        $manifests[$manifest_json['name']] = $manifest_json;
      }
      unset($manifests['@psu-ooe/patternlab']);

      // Recursively sort the manifests until dependency order is met...
      while (TRUE) {
        $modified = FALSE;
        foreach ($manifests as $component => $manifest) {
          $component_position = array_search($component, array_keys($manifests), TRUE);
          if (isset($manifest['dependencies'])) {
            foreach ($manifest['dependencies'] as $dependency => $version) {
              $dependency_position = array_search($dependency, array_keys($manifests), TRUE);
              if ($component_position < $dependency_position) {
                $manifests = moveKeyBefore($manifests, $component, $dependency);
                $modified = TRUE;
                break 2;
              }
            }
          }
        }
        if (!$modified) {
          break;
        }
      }

      $styles = '';
      foreach (array_keys($manifests) as $manifest) {
        $component = str_replace('@psu-ooe/', '', $manifest);
        $potential_css_file = "packages/$component/dist/styles.css";
        if (file_exists($potential_css_file)) {
          $file_content = file_get_contents($potential_css_file);
          // Strip out any UTF-8 BOM sequences before inlining.
          $styles .= preg_replace("/^\xEF\xBB\xBF/", '', $file_content);
        }
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

