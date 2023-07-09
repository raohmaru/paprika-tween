# Paprika! 🌶
A spicy JavaScript tweening/animation engine.

Paprika 🌶 is a bare-bones, low-level library for the browser and node.js which applies an [interpolation](https://en.wikipedia.org/wiki/Interpolation)
between two numbers using an [easing equation](http://robertpenner.com/easing/) over a discrete amount of time.

```javascript
import { Mixer, Spice } from 'paprika-tween';
import { Cubic } from 'paprika-tween/easing';
// Create some spices with properties to interpolate
const spice1 = new Spice({
    duration: 100,
    from: { x: 0, y: 0 },
    to: { x: 200, y: 200 },
    // Easing equation to calculate the interpolation
    easing: Cubic.InOut,
    render: ({ x, y }) => {
        // Do something with `x` and `y`
    }
});
const spice2 = new Spice({
    duration: 100,
    from: { gamma: 1.0 },
    to: { gamma: 2.2 },
    render: ({ gamma }) => {
        // Do something with `gamma`
    },
    onEnd: (props) => {
        // Fired when the interpolation ends
    }
});
const mixer = new Mixer();
// Put the spices in the mixer
mixer.add(spice1, spice2)
// And start the tweening
     .start(0);
// Advance to time 25
mixer.frame(25);
```

Paprika 🌶 does not request an animation frame to move the tween forwards. You should call the `frame()` method by using
[`requestAnimationFrame()`](https://developer.mozilla.org/en/docs/Web/API/Window/requestAnimationFrame) or an instance of the
[Mortar](https://raohmaru.github.io/paprika-tween/Mixer.html) class.

Or you can use a [sweet](https://raohmaru.github.io/paprika-tween/module-paprika_sweet.html) paprika.

```javascript
import { sweet } from 'paprika-tween';
sweet({
    duration: 500,
    delay: 50,
    from: { size: 0 },
    to:   { size: 10 }
    render: ({ size }) => { ... }
});
```

## Installation
In the browser, you can load Paprika 🌶 from a CDN or you can [download the minified JS file](https://github.com/raohmaru/paprika-tween/releases)
and store it in your application.
| URL | Type |
|:----|:-----|
| https://unpkg.com/paprika-tween | [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) |
| https://unpkg.com/paprika-tween/dist/paprika-tween.iife.min.js | [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) |

If you are using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules),
then you can import Paprika 🌶 by its URL:
```html
<script type="module">
import { Mixer, Spice, Recipe, Mortar, sweet } from 'https://unpkg.com/paprika-tween';
</script>
```

If you prefer using Paprika 🌶 as a global variable, you can load the [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) variant which
exposes the global variable `Paprika`.
```html
<script src="https://unpkg.com/dist/paprika-tween.iife.min.js"></script>
<script>
  const { Mixer, Spice, Recipe, Mortar, sweet } = Paprika;
</script>
```

If you are building your app using node.js (or writing a node.js app), you can install Paprika 🌶 using npm:
```bash
npm install paprika-tween
```
and then load it using [ECMAScript modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)
```javascript
import { Mixer, Spice, Recipe, Mortar, sweet } from 'paprika-tween';
```
or as a CommonJS module:
```javascript
const { Mixer, Spice, Recipe, Mortar, sweet } = require('paprika-tween');
```

## How to Cook
There are several ways to use Paprika 🌶.

### Using a Spice
A [Spice](https://raohmaru.github.io/paprika-tween/Spice.html) is the minimum tweenable object. It can be tweened alone,
or by adding it to a [Recipe](https://raohmaru.github.io/paprika-tween/Recipe.html) or to a
[Mixer](https://raohmaru.github.io/paprika-tween/Mixer.html):
```javascript
const spice = new Spice({
    duration: 45,
    from: { size: 10 },
    to: { size: 520 },
    render: ({ size }) => {
       console.log(size);
    }
});
spice.start(0);
spice.frame(15);
spice.frame(33);
```

### Using a Recipe
A [Recipe](https://raohmaru.github.io/paprika-tween/Recipe.html) can contain one or more spices, that will be tweened in sequence.
```javascript
const spice1 = new Spice({ ... });
const spice2 = new Spice({ ... });
const recipe = new Recipe({ onEnd: () => {} });
recipe.add(spice1, spice2)
    .start();
recipe.frame(performance.now());
```

### Using a Mixer
A [Mixer](https://raohmaru.github.io/paprika-tween/Mixer.html) can contain any number of spices or recipes, and all of them will be
tweened at the same time.
```javascript
const spice = new Spice({ ... });
const recipe = new Recipe()
    .add(new Spice({ ... }), new Spice({ ... }));
const mixer = new Mixer();
mixer.add(spice, recipe);
mixer.start(2000);
mixer.frame(2500);
```

### Shaking the Spices
To perform an animation of a Spice, Recipe or Mixer, you can use the method
[`requestAnimationFrame()`](https://developer.mozilla.org/en/docs/Web/API/Window/requestAnimationFrame)
to call the method `render()` on each frame update.

```javascript
const recipe = new Recipe({ onEnd: () => cancelAnimationFrame(rafID) });
recipe.add(new Spice({ ... }), new Spice({ ... }));
const mixer = new Mixer();
mixer.add(recipe)
     .start();
function loop(timestamp) {
    mixer.frame(timestamp);
    rafID = requestAnimationFrame(loop);
}
let rafID = requestAnimationFrame(loop);
```

The [Mortar](https://raohmaru.github.io/paprika-tween/Mortar.html) class can also perform an animation for a given
[frames per second](https://en.wikipedia.org/wiki/Frame_rate) on a more performant way by ensuring that the animation is run
at the same speed regardless of the device and network conditions.
```javascript
const spice = new Spice({ ... });
const mixer = new Mixer();
mixer.add(spice)
     .start();
const mortar = new Mortar(time => mixer.frame(time), 15);
mortar.start();
```

### Sweet Paprika 🌶
The [`sweet()`](https://raohmaru.github.io/paprika-tween/module-paprika_sweet.html) function starts automatically
an animation, which returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/)
that can be chained by using its method [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
or the [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) keyword.

Chained animations using the returned function `sweetie()` will reuse the `spice` created by `sweet()`.
```javascript
const { sweetie, spice } = await sweet({
    duration: 2000,
    from: { width: 100 },
    to:   { width: 200 }
    render: ({ width }) => { ... }
});
await sweetie({
    to:   { width: 0 }
});
await sweetie({
    duration: 1000,
    to:   { width: 300 }
});
```

### Using Easing Equations
Every spice needs an [easing equation](http://robertpenner.com/easing/) to calculate the amount of progression of a property over time.
The default easing equation is linear (no easing applied).

You can use your custom easing equation:
```javascript
import { Spice } from 'paprika-tween';
const spice1 = new Spice({
    from: { z: 10 },
    to: { z: 55 },
    // `v` is a float number between 0 (start) and 1 (end)
    easing: (v) => Math.random() * v
});
```
Or one of the functions [provided by in the Paprika package](https://github.com/raohmaru/paprika-tween/tree/master/src/easing):
```javascript
import { Spice } from 'paprika-tween';
import { Exponential  } from 'paprika-tween/easing';
const spice1 = new Spice({
    from: { z: 10 },
    to: { z: 55 },
    easing: Exponential.Out
});
```
If you are using Paprika as a standalone library, you can get the easing equations from a CDN or [download the minified JS file](https://github.com/raohmaru/paprika-tween/releases).
| CDN URL | Type |
|:--------|:-----|
| https://unpkg.com/paprika-tween/dist/easing.min.js | [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) |
| https://unpkg.com/paprika-tween/dist/easing.iife.min.js | [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) |

## Compatibility
Paprika 🌶 runs in any JavaScript environment that supports the following features:
+ [`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
+ [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
+ [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
+ Nullish coalescing assignment [`??=`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)

You should provide your own polyfills in case any of these features are missing, like a
[polyfill for `requestAnimationFrame()`](https://gist.github.com/raohmaru/af6c2f86b7214627f049ae1ba52981ba) in node.js,
or use a [transpiler](https://javascript.info/polyfills) when building your application.

# License
Paprika 🌶 is distributed under the [MIT license](https://github.com/raohmaru/paprika-tween/blob/master/LICENSE).