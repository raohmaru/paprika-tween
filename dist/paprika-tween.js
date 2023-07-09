/*! For license information please see https://github.com/raohmaru/paprika-tween/blob/master/LICENSE */

// src/mixer.js
var Mixer = class {
  /**
   * Creates a new Mixer instance.
   * @constructor
   * @since 1.0.0
   */
  constructor() {
    this.spices = [];
  }
  /**
       * Adds one or more [spices]{@link Spice} or [recipes]{@link Recipe} (this is, animatable objects with properties to interpolate).
       * @param {...(Spice|Recipe)} rest - Instances of Paprika animatable objects.
       * @returns {Mixer} - The current instance of the Mixer.
       * @since 1.0.0
      * @example
  import { Mixer, Spice } from 'paprika-tween';
  const spice1 = new Spice({ ... });
  const spice2 = new Spice({ ... });
  const mixer = new Mixer();
  mixer.add(spice1, spice2);
       */
  add(...rest) {
    for (let i = 0; i < rest.length; i++) {
      this.spices.push(rest[i]);
    }
    return this;
  }
  /**
       * Starts all the animations in the mixer by setting the starting time of each animatable objects at the given
       * <code>time</code> argument.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The initial number from where to start the animation.
       * @returns {Mixer} - The current instance of the Mixer.
       * @since 1.0.0
      * @example
  import { Mixer } from 'paprika-tween';
  const mixer = new Mixer();
  mixer.start(0);
       */
  start(time) {
    for (let i = 0; i < this.spices.length; i++) {
      this.spices[i].start(time);
    }
    return this;
  }
  /**
   * Stops all animations and clears the stack of animatable objects.
   * @since 1.0.0
   */
  dispose() {
    for (let i = this.spices.length - 1; i !== -1; i--) {
      this.spices[i].dispose();
    }
    this.spices.length = 0;
  }
  /**
       * Moves the interpolation of the properties of the animatable objects in the mixer by the given time, which is
       * relative to the starting time.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The amount of time to interpolate since the animations started.
       * @since 1.0.0
      * @example
  import { Mixer, Spice } from 'paprika-tween';
  const spice = new Spice({
      duration: 10,
      from: { width: 100 },
      to: { width: 550 },
      render: (props) => { ... }
  });
  const mixer = new Mixer(0);
  mixer.add(spice)
       .start();
  mixer.frame(1);
       */
  frame(time) {
    for (let i = 0; i < this.spices.length; i++) {
      this.spices[i].frame(time);
    }
  }
};

// src/seed.js
var Seed = class {
  /**
   * Creates a new Seed instance.
   * @since 1.0.0
   */
  constructor() {
    this.elapsed = 0;
  }
  /**
   * Calculates the current elapsed time of the interpolation as a float number between 0 (start) and 1 (end).
   * @private
   * @param {Number} time - The current time.
   * @returns {Number} - A float number between 0 and 1.
   */
  elapse(time) {
    let elapsed = (time - this._startTime) / this.duration;
    if (elapsed < 0) {
      elapsed = 0;
    } else if (elapsed > 1) {
      elapsed = 1;
    }
    return elapsed;
  }
};

// src/recipe.js
var defaults = {
  onEnd: () => {
  }
};
var Recipe = class extends Seed {
  /**
   * Creates a new Recipe instance with the given options.
   * @param {Object} options
   * @param {function} [options.onEnd] - Function called when the last {@link Spice} reaches the end of the interpolation.
   * It receives the current instance as an argument.
   * @since 1.0.0
   */
  constructor(options) {
    super();
    Object.assign(this, defaults, options);
    this.spices = [];
  }
  /**
       * Adds one or more [spices]{@link Spice}.
       * @param {...Spice} rest - Instances of {@link Spice} objects.
       * @returns {Recipe} - The current instance of the Recipe.
       * @since 1.0.0
      * @example
  import { Recipe, Spice } from 'paprika-tween';
  const spice1 = new Spice({ ... });
  const spice2 = new Spice({ ... });
  new Recipe().add(spice1, spice2);
       */
  add(...rest) {
    for (let i = 0; i < rest.length; i++) {
      this.spices.push(rest[i]);
    }
    return this;
  }
  /**
       * Sets the starting time at the <code>time</code> argument. The first animatable object in the Recipe will start
       * at this time.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The initial number from where to start the animation.
       * @since 1.0.0
      * @example
  import { Recipe } from 'paprika-tween';
  const recipe = new Recipe();
  recipe.start(1000);
       */
  start(time) {
    let spice;
    let duration = 0;
    for (let i = 0; i < this.spices.length; i++) {
      spice = this.spices[i];
      if (!this.elapsed) {
        spice.delay += duration;
        duration = spice.duration + spice.delay;
      }
      spice.start(time);
    }
    this._startTime = this.spices[0]._startTime;
    if (!this.elapsed) {
      this.duration = duration;
    }
    return this;
  }
  /**
       * Moves the interpolation of the properties of the active spice in the recipe by the given time, which is
       * relative to the starting time.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The amount of time to interpolate since the animations started.
       * @since 1.0.0
      * @example
  import { Recipe, Spice } from 'paprika-tween';
  const spice1 = new Spice({
      ...,
      duration: 1700
  });
  const spice2 = new Spice({
      ...,
      duration: 2000
  });
  const recipe = new Recipe().add(spice1, spice2)
        .start();
  recipe.frame(performance.now() + 1800);
       */
  frame(time) {
    if (!this.spices.length) {
      return;
    }
    time ?? (time = performance.now());
    let elapsed = this.elapse(time);
    if (this.elapsed === elapsed) {
      return;
    }
    this.elapsed = elapsed;
    for (let i = 0; i < this.spices.length; i++) {
      this.spices[i].frame(time);
    }
    if (elapsed === 1) {
      this.onEnd(this);
    }
  }
  /**
   * Disposes the spices in the recipe and removes its callback functions, making the instance eligible
   * for the garbage collector.
   * @since 1.0.0
   */
  dispose() {
    for (let i = this.spices.length - 1; i !== -1; i--) {
      this.spices[i].dispose();
    }
    this.spices.length = 0;
    this.onEnd = null;
  }
};

// src/spice.js
var defaults2 = {
  duration: 0,
  delay: 0,
  from: {},
  to: {},
  easing: (t) => t,
  // Linear.None
  render: () => {
  },
  onEnd: () => {
  }
};
var Spice = class extends Seed {
  /**
   * Creates a new Spice instance with the given options.
   * @param {Object} options
   * @param {number} options.duration - The duration of the interpolation. The time scale should be the same as the
   * starting time and the [frame()]{@linkcode Spice#frame} time.
   * @param {number} [options.delay] - The delay time to start the interpolation.
   * @param {Object} options.from - An object with key/value pairs of numeric properties to interpolate from.
   * @param {Object} options.to - An object with the numeric properties to interpolate to.
   * @param {function} [options.easing] - The easing function with which calculate the value of the property at a given time.
   * You can use your custom function or a function available at [paprika-tween/easing]{@link module:paprika-tween/easing}.
   * Default is <code>Linear.None</code> (no easing).
   * @param {function} options.render - A callback function that will be called after each [render]{@linkcode Spice#frame}.
   * It receives three arguments: the first being an object with the properties interpolated for the given time,
   * the second the amount of interpolation applied from <code>0</code> to <code>1</code>,
   * and the third the instance of the current Spice.
   * @param {function} [options.onEnd] - Function called when the interpolation reaches the end. It receive an argument as
   * an object with the properties interpolated to its end values.
   * @since 1.0.0
   */
  constructor(options) {
    super();
    Object.assign(this, defaults2, options);
  }
  /**
       * Sets the starting time of the interpolation at the given <code>time</code> argument.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The initial number from where to start the animation.
       * @since 1.0.0
      * @example
  import { Spice } from 'paprika-tween';
  const spice = new Spice({ ... });
  spice.start(5);
       */
  start(time) {
    this._startTime = time ?? performance.now();
    this._startTime += this.delay;
    this._interpolated = Object.assign(/* @__PURE__ */ Object.create(null), this.to);
  }
  /**
       * Moves the interpolation of the properties of the spice by the given time, which is
       * relative to the starting time.<br>
       * If <code>time</code> is not provided, the timestamp from
       * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
       * will be used instead.
       * @param {(DOMHighResTimeStamp|number)} [time] - The amount of time to interpolate since the animations started.
       * @since 1.0.0
      * @example
  import { Spice } from 'paprika-tween';
  const spice = new Spice({
      duration: 10,
      from: { width: 100 },
      to: { width: 550 },
      render: (props) => { ... }
  });
  spice.start(0);
  spice.frame(2);
       */
  frame(time) {
    time ?? (time = performance.now());
    let elapsed = this.elapse(time);
    if (this.elapsed === elapsed) {
      return;
    }
    this.elapsed = elapsed;
    const value = this.easing(elapsed);
    let start, end, key;
    for (key in this._interpolated) {
      start = this.from[key] ?? 0;
      end = this.to[key];
      this._interpolated[key] = start + (end - start) * value;
    }
    this.render(this._interpolated, value, this);
    if (elapsed === 1) {
      this.onEnd(this._interpolated, this);
    }
  }
  /**
   * Removes the interpolatable properties of the instance and its callback functions, making the instance eligible
   * for the garbage collector.
   * @since 1.0.0
   */
  dispose() {
    this.from = null;
    this.to = null;
    this.render = null;
    this.onEnd = null;
  }
  /**
   * Modifies the properties of the spice with the given object.
   * @param {Object} options - See [Spice constructor]{@linkcode Spice} for the available properties of the <code>options</code> object.
   * @returns {Spice}
   * @since 1.0.0
   */
  update(options) {
    Object.assign(this, options);
    return this;
  }
};

// src/mortar.js
var Mortar = class {
  /**
   * Creates a new instance of the Mortar object.
   * @param {function} [cb] - The function to be called at the given frame rate. It receives two arguments: the time since it started,
   * and the elapsed time since the previous frame (or delta time).
   * @param {Number} [fps=60] - The integer number of times to call the callback function per second (frames per second).
   * Number must be an integer.
   * @since 1.0.0
   */
  constructor(cb, fps = 60) {
    this._cb = cb;
    this._fpsInterval = 1e3 / fps;
    this._running = false;
  }
  /**
   * Starts the frame-by-frame loop by internally calling to [requestAnimationFrame()]{@link https://developer.mozilla.org/en/docs/Web/API/Window/requestAnimationFrame}.
   * The callback function will be called the <code>fps</code> number of times per second.
   * @since 1.0.0
   */
  start() {
    this._startTime = performance.now();
    this._previousTime = this._startTime;
    this._previousDeltaTime = this._startTime;
    this._pausedTime = 0;
    this._running = true;
    this._onFrame = (currentTime) => this.frame(currentTime);
    this.frame(this._startTime);
  }
  /**
   * Pauses the frame-by-frame loop.
   * @since 1.0.0
   */
  pause() {
    this._running = false;
    this._previousPauseTime = performance.now();
  }
  /**
   * Resumes the frame-by-frame loop.
   * @since 1.0.0
   */
  resume() {
    const now = performance.now();
    this._pausedTime += now - this._previousPauseTime;
    this._running = true;
    this.frame(now);
  }
  /**
   * Stops the frame-by-frame loop and removes the callback function. Further calls to {@linkcode Mortar#start} will fail.
   * @since 1.0.0
   */
  stop() {
    this.pause();
    this._cb = null;
    this._onFrame = null;
  }
  /**
       * The <code>frame()</code> method is called before the browser performs the next repaint, then it calls the callback function.
       * Mortar will ensure that the callback function is called no more than <code>fps</code> number of times per second.
       * <br>
       * To keep the same speed in your animation, Be sure to use the <code>delta</code> argument to calculate how much the
       * animation will progress in a frame.
       * @since 1.0.0
       * @example
  import { Mortar } from 'paprika-tween';
  function loop(time, delta) {
      character.left += character.speed * delta;
  }
  const mortar = new Mortar(loop, 10);
  mortar.start();
       */
  frame(currentTime) {
    if (!this._running) {
      return;
    }
    currentTime -= this._pausedTime;
    let delta = currentTime - this._previousDeltaTime;
    if (delta >= this._fpsInterval) {
      this._previousDeltaTime = currentTime - delta % this._fpsInterval;
      this._cb(currentTime, currentTime - this._previousTime);
      this._previousTime = currentTime;
    }
    if (this._onFrame) {
      requestAnimationFrame(this._onFrame);
    }
  }
  /**
   * Returns whether the instance is running or not.
   * @type {Boolean}
   */
  get running() {
    return this._running;
  }
  /**
   * Returns the time since the Mortar started.
   * @type {DOMHighResTimeStamp}
   */
  get time() {
    return this._previousTime;
  }
};

// src/sweet.js
var Sweetie = class extends Spice {
  constructor(options) {
    super(options);
    this._mortar = new Mortar((time) => this.frame(time));
  }
  start() {
    this._mortar.start();
    super.start(this._mortar.time);
  }
  /**
   * Pauses the animation.
   * @since 1.0.0
   */
  pause() {
    this._mortar.pause();
  }
  /**
   * Resumes the animation.
   * @since 1.0.0
   */
  resume() {
    this._mortar.resume();
  }
  /**
   * Stops the animation, removes its interpolatable properties and its callback functions.
   * @since 1.0.0
   */
  dispose() {
    super.dispose();
    this._mortar.stop();
    this._mortar = null;
  }
  async run(options) {
    return new Promise((resolve) => {
      this.onEnd = function() {
        this.pause();
        resolve({
          sweetie: this.run.bind(this),
          spice: this
        });
      };
      if (options) {
        this.from = this.to;
        this.update(options);
      }
      this.start();
    });
  }
  /**
   * Returns whether the instance is running or not.
   * @type {Boolean}
   */
  get running() {
    return this._mortar.running;
  }
  /**
   * @method frame
   * @private
   */
};
function sweet(options) {
  return new Sweetie(options).run();
}
export {
  Mixer,
  Mortar,
  Recipe,
  Spice,
  sweet
};
//# sourceMappingURL=paprika-tween.js.map
