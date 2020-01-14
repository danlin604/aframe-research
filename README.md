# A-Frame

A-Frame is a framework for VR.

A-Frame supports most VR headsets:
- Vive
- Rift
- Windows Mixed Reality
- Daydream
- GearVR, Cardboard
- Oculus Go
- AR
- Positional tracking
- Controllers

Technologies:
- three.js (Forked)
- webvr-polyfill (Immersive Web at W3C)

A-Frame core team members are:
- Diego Marcos
- Kevin Ngo
- Don McCurdy

Development questions and support can be found on:

- [GitHub](https://github.com/aframevr/aframe/)
- [stackoverflow](https://stackoverflow.com/questions/tagged/aframe)
	- Filter by [aframe]
- [Slack](aframevr.slack.com)

Post your issues on stackoverflow for more visibility and response.

# Basic Starter

Quick to mock and test.

	<html>
	  <head>
	    <script src="https://aframe.io/releases/1.0.3/aframe.min.js"></script>
	  </head>
	  <body>
	    <a-scene>
	      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
	      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
	      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
	      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
	      <a-sky color="#ECECEC"></a-sky>
	    </a-scene>
	  </body>
	</html>

Use [glitch.com](https://glitch.com/~aframe) to mock and test A-Frame quickly. It has the added benefit of allowing asset upload and is a quick way to test for mobile.

# Should we lazy-loading A-Frame

There is no direct mention about *when* A-Frame should be imported into a project, but it should be ready when components are registered and used. If you do not import A-Frame inside <head>, you will see a warning on the console. A-Frame will still work with this warning.

[Angular Integration Document](https://stackoverflow.com/questions/46464103/various-errors-when-attempting-to-integrate-aframe-into-angular2-project-esp-wi)

Be aware it is out of date, so it's implementation will not fully work.

# Resolving issues with unit tests:

Depending on how you use A-Frame in your app, this may or may not be an issue for you. However, as soon your test expects `AFRAME` or `THREE` to be defined in the DOM or in `window`, then importing A-Frame in the `<head>` of `index.html` can break and stop your unit tests from running.

This error can be reproduced by creating a basic script file that calls `AFRAME`. You might want to create your own A-Frame component and import them into Angular component:

	// foo.script.js
	AFRAME.registerComponent('foo', {
	  schema: {},
	  init: function () {},
	  update: function () {},
	  tick: function () {},
	  remove: function () {},
	  pause: function () {},
	  play: function () {}
	});

`foo.script.js` is imported into an Angular component to be used:

	// foo.component.ts
	import 'src/script/foo.script.js';

The application will run normally under `ng serve`. This is because `index.html` includes A-Frame.

	// index.html
	<head>
	  <meta charset="utf-8">
	  <title>Aframe</title>
	  ...
	  <script src="../node_modules/aframe/dist/aframe-master.js"></script>
	</head>

You'll see the expected console.log where A-Frame correctly initiates:

> A-Frame Version: 0.9.2 (Date 2019-05-06, Commit #f57a1fa)

> three Version (https://github.com/supermedium/three.js): ^0.102.2

> WebVR Polyfill Version: ^0.10.10

However, when we run `ng t` you'll note that this same prompt is missing in the console. A-Frame is not included here. Karma does not include A-Frame when it executes the unit tests. Karma will instead break, and your tests will not fully run.

> ./src/scripts/foo.script.js?:3 Uncaught ReferenceError: AFRAME is not defined

The `.html` file for the karma is located under:

`node_modules\@angular-devkit\build-angular\src\angular-cli-files\plugins\karma-context.html`
`node_modules\@angular-devkit\build-angular\src\angular-cli-files\plugins\karma-debug.html`

Once the import for A-Frame is included here (`karma-context.html`), then your unit test will include A-Frame and will run normally:

	// karma-context.html
	<head>
	  <title></title>
	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	  <script src="https://aframe.io/releases/1.0.1/aframe.min.js"></script>
	</head>

We can automate this for future tests by creating your own `karma-context.html` and `karma-debug.html`. Under `scripts` directory, create a copy each for both `html` files that includes the A-Frame import. Keep the `karma-context.html` and `karma-debug.html` unmodified in your `node_modules` folder. Changes inside are not propagated when your project is cloned, so our modifications need to live elsewhere.

Create a script that will copy the modified `html` into node_module when karma runs:

	// scripts/karma-copy.test.js
	const fs = require('fs');

	// Modify karma-context.html
	fs.copyFile(
	  'src/scripts/karma-context.html',
	  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/karma-context.html',
	  (err) => {
	    if (err) throw err;
	  }
	);
	
	// Modify karma-debug.html
	fs.copyFile(
	  'src/scripts/karma-debug.html',
	  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/karma-debug.html',
	  (err) => {
	    if (err) throw err;
	  }
	);

Include the script in `karma.config.js`:

    plugins: [
      require('../src/scripts/karma-copy.test.js'),
      ...
    ],

Now, when you close your project, `ng t` will include A-Frame in the `<head>`.


# A-Frame & Angular Integration

Setup a lazy-loaded A-Frame project within Angular. [Follow the instruction for lazy-loading from the official Angular documents](https://angular.io/guide/lazy-loading-ngmodules).

# Lazy-loading

*Justification*

A-Frame is not always required in the Angular application. Sometimes all you need to do is to show a simple HTML page. Maybe it is a landing page, a login page, an about page, none of these pages require A-Frame to be present and running.

If you do lazy-load A-Frame, you will at least need to import custom components after A-Frame. There will be errors if dependencies aren't present in the DOM when components are used. Note that the recommended A-Frame import is a *blocking* import in the <head> tag, and A-Frame may not fully initialize when you register your custom components.

	Is there a performance impact navigating back-and-forth where libraries are re-initialized?

Lazy-loading prevents The current (0.9.2) minified A-Frame library is 1.08 MB.

Other libraries or custom A-Frame components may be included. 

	A-Frame alone may not satisfy your needs. It is possible to include:
		- custom A-Frame components
		- custom A-Frame component libraries with pre-made components
		- updates from A-Frame from their master or feature branch
		- updates from THREE.js from their master or feature branch
		- updates from THREE.js from their modules libraries

A-Frame does not use the latest version of THREE.js. You may find that calls and methods that work for THREE.js may not exist in the THREE.js library included in you A-Frame library.

You can call each respective library in the DOM once A-Frame have been imported:
	- `AFRAME` 
	- `THREE`

*The basic A-Frame project*

Once lazy-loading have been setup following Angular's document, there would be a `router-outlet` in the `app.component.html` file.

	<router-outlet></router-outlet>

Our goal for the outlet is for it to output an A-Frame scene (`a-scene`) on navigation, and hiding the scene when we navigate away.

We will be ignore all the `.spec` (testing) and unused files that has been auto-generated by `angular-cli`.

If the lazyloaded example is followed, you should have the following files:

[name]-routing.module.ts
[name].module.ts
[name].component.ts
[name].component.css

<a-scene background="color: #FAFAFA">
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
  <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
</a-scene>

Navigating away will remove the scene from the DOM, and thereby hiding A-Frame.

## A-Frame Code Demo

A-Frame is picky about nesting...

	<a-scene background="color: #FAFAFA">
	  <div>
	  	<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
	  </div>
	</a-scene>

A-Frame will only work with other A-Frame elements. If a non-A-Frame element separates A-Frame elements, then the unconnected element will be loaded into A-Frame.

For Angular, be careful about how you name your components. If a compoenent is named `a-box`, then A-Frame will recognize that component as an A-Frame element.

    /**
     * Basic A-Frame entity creation
     * 
     * 1. Create an element
     * 2. Set their attribute
     * 3. Append the element to an A-Frame node.
     */
    {
      const scene = document.querySelector('a-scene');
      const el = document.createElement('a-entity');
      el.setAttribute('position', '0 0 -4');
      el.setAttribute('geometry', {
        ...(changes.primitive.currentValue ? { primitive: changes.primitive.currentValue } : {})
      });
      el.setAttribute('material', {
        ...(changes.color.currentValue ? { color: changes.color.currentValue } : {})
      });
      scene.appendChild(el);
    }

If the component is destroyed, the child will persist! Always remember cleanup when manipulating the DOM!

    /**
     * Object based A-Frame entity creation
     * 
     * An entity can have multiple attributes (geography, material, etc),
     * and each attribute can have a nested structure. Inputs can be objects
     * so that there is no need to parse individual values and keys.
     */
    {
      const scene = document.querySelector('a-scene');
      const data = changes.data.currentValue;
      const el = document.createElement('a-entity');
      el.id = 'entity3_id'
      el.setAttribute('position', '2 2 -5');
      for (let key in data) {
        el.setAttribute(
          key,
          data[key]
        );
      }
      scene.appendChild(el)
    }

Automically remove the A-Frame element from the DOM when its parent is removed.

    /**
     * Append A-Frame entity by host element.
     * 
     * Removal of host element will also remove all child elements.
     */
    {
      const data = changes.data.currentValue;
      this.hostEl.nativeElement.setAttribute('position', '1 4 -5');
      for (let key in data) {
        this.hostEl.nativeElement.setAttribute(
          key,
          data[key]
        );
      }
    }

Cleanup can also be done when `ngOnDestroy` is triggered.

It general, we don't want to track what is on the DOM.

# Spotlight's A-Frame

# Custom Components

# Component Wrappers

# Managing Assets