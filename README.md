## Using Components
This documentation is aimed at people that wish to use components.

The recommended way to use components it through NPM. Each component has a
corresponding package hosted in the [Github Package Registry](https://github.com/orgs/PSU-OOE/packages?repo_name=components).

### Via CDN
@TODO: Ask the security office about hosting packages via CDN.

### Via Package Manager
#### Configuring NPM
The recommended way to configure access to the component registry is through
a `.npmrc` file in your project root.
```text
@psu-ooe:registry = https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```
Do note that `NPM_TOKEN` is an environment variable! This variable can be a
[Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
#### Installing a component
After configuring your project to pull components from the Github registry,
installing a component is as easy as `npm install @psu-ooe/component-name`.

For a complete list of components, see the package registry.

## Components Development
This documentation is aimed at people that wish to contribute components.

### Monorepo Setup
- Initialize and set upstream or clone the monorepo
- In monorepo directory:
	- `$ yarn install`

### Creating Packages
- In the packages directory:
  - `$ mkdir packages/package-name`
    - Example: `packages/my-new-package`
- Add files to new package
  - Package manifest
    - `touch packages/my-new-package/package.json`
    - Example:
      ```
      {
        "name": "@psu-ooe/my-new-package",
        "version": "1.0.0",
        "description": "Provides a demo component.",
        "publishConfig": {
          "access": "public",
          "registry": "https://npm.pkg.github.com/"
        }
      }
      ```
  - Twig template
    - `touch packages/my-new-package/my-new-package.twig`
  - Styles
    - `mkdir packages/my-new-package/src/scss`
    - `touch packages/my-new-package/src/scss/styles.scss`
  - Scripts
    - `mkdir packages/my-new-package/src/js`
    - `touch packages/my-new-package/src/js/scripts.js`
- Commit and push changes
  - `git push origin <branch name>`
  - Commits to the `main` branch will trigger automatic packaging!
#### Styles
- Style file must be named `styles.scss`.
- Component styles use SASS.
- Styles must be scoped to the component class.
- Example:
```scss
.my-new-package {
  // Styles.

  &__element {
    // Styles.

    &--modifier {
      // Styles.
    }
  }
}
```
#### Javascript
- Script file must be named `scripts.js`
- Do not define global variables within component scripts.
- Be sure to bootstrap the script properly by attaching it to the `cms` object.
- Example:
```js
(cms => {
  cms.attach('my-new-package', context => {
    // Component scripting starts here.
  });
})(cms);
```
##### The `cms` object
In order to remain platform-agnostic, there are several concepts that have been
abstracted. The design system does not have an opinion on the implementation
details of such concepts, but rather exposes an interface that consumers can
provide an implementation for. Typically this is a `<script>` that is placed
within the `<head>` element by the CMS integrator.
1. **attach(component, callback)** - Registers the component script with the CMS.
    1. _component_ is a string that uniquely identifies the component
    2. _callback_ is a function that executes the component scripting against a
      context. The default context is the `document` object, but it is
      recommended that the integrating CMS pass in tightly scoped contexts for
      dynamically added content.
    3. Example:
   ```
   const callback = context => {
     const components = context.querySelectorAll('.my-component');
     components.forEach(component => {
       // ...component specific business logic.
     });
   }
   ```
2. **detach(component, callback)** - Unregisters the component script with the CMS.
    1. _component_ is a string that uniquely identifies the component
    2. _callback_ is a function that executes the component un-scripting
       against a context.
    3. Example:
   ```
   const callback = context => {
     const components = context.querySelectorAll('.my-component');
     components.forEach(component => {
       // ...perform any cleanup before the component is removed from the DOM.
     });
   }
   ```
3. **once(id, selector, context)** - Fulfills the [Once Pattern](https://medium.com/@ianaya89/javascript-once-pattern-89b8a4f04245)
    1. _id_ is the unique identifier for the action that should happen once.
    2. _selector_ is the CSS selector that chooses elements.
    3. _context_ is the DOM element that the once selection is scoped to.
    4. Example:
    ```js
    const elements = once('my-component', '.my-component', document);
    elements.forEach(element => {
      element.addEventListener('click', () => {
        // This event is guaranteed to only be attached once to this element.
      });
    });
    ``` 
4. **announce(text, priority)** - Requests that assistive technology 
5. i
###### `cms` Example (Drupal)
```js
<script>
  const cms = {
    attach: (component, callback) => {
      if (typeof Drupal !== 'undefined' && typeof Drupal.behaviors !== 'undefined') {
        Drupal.behaviors[component] = Drupal.behaviors[component] || {};
        Drupal.behaviors[component].attach = callback;
      }
    },
    detach: (component, callback) => {
      if (typeof Drupal !== 'undefined' && typeof Drupal.behaviors !== 'undefined') {
        Drupal.behaviors[component] = Drupal.behaviors[component] || {};
        Drupal.behaviors[component].detach = callback;
      }
    },
    once: (id, selector, context = document) => once(id, selector, context),
    announce: (text, priority) => {
      if (typeof Drupal !== 'undefined' && typeof Drupal.announce !== 'undefined') {
        Drupal.announce(text, priority);
      }
    },
    data: name => {
      if (typeof drupalSettings !== 'undefined' && drupalSettings.exposed_data !== 'undefined') {
        return drupalSettings.exposed_data[name];
      }
    },
    gtm_container_id: 'GTM-XXXXXX',
  };
</script>
```

###### `cms` Example (Wordpress)
Note - Wordpress has limited support for dynamically added content.
```js
<script>
  const global_data = {};
  const cms = {
    attach: (component, callback) => callback(document),
    detach: (component, callback) => { /* Not supported. */ },
    once: (id, selector, context = document) => context.querySelectorAll(selector),
    announce: (text, priority) => { /* Not supported. */ },
    data: name => global_data[name],
    gtm_container_id: 'GTM-XXXXXX',
  };
</script>
```
