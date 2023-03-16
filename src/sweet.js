import { Spice, Mortar } from './index.js';

/**
 * A Sweetie is a {@link Spice} which can be animated by itself. It is created when calling the method [sweet()]{@linkcode module:paprika-tween/sweet}.
 * @example
import { sweet } from 'paprika-tween';
const { sweetie, spice } = await sweet({
    duration: 2000,
    from: { width: 100 },
    to:   { width: 200 }
    render: (props, interpolation) => { ... }
});
spice.pause();
spice.resume();
await sweetie({
    to:   { width: 0 }
});
spice.dispose();
 * @since 1.0.0
 */
class Sweetie extends Spice {
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
            this.onEnd = function () {
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
}
/**
 * The function <code>sweet()</code> creates a tween animation that will run for the given duration, interpolating the
 * given properties from start to end by using an easing function.<br>
 * <code>sweet()</code> returns a [thenable object]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables}
 * which can be chained with the method [then()]{@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then}
 * or awaited with the keyword [await]{@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
 * to create animations.
 * @param {Object} options
 * @param {number} options.duration - The duration of the interpolation. The time scale should be the same as the
 * starting time and the [frame()]{@linkcode Spice#frame} time.
 * @param {number} [options.delay] - The delay time to start the interpolation.
 * @param {Object} options.from - An object with key/value pairs of numeric properties to interpolate from.
 * @param {Object} options.to - An object with the numeric properties to interpolate to.
 * @param {function} [options.easing] - The easing function with which calculate the value of the property at a given time.
 * You can use your custom function or a function available at [paprika-tween/easing]{@link module:paprika-tween/easing}.
 * Default is <code>Linear.None</code>.
 * @param {function} options.render - A callback function that will be called after each [render]{@linkcode Spice#frame}.
 * It receives two arguments: the first being the amount of interpolation applied from <code>0</code> to <code>1</code>,
 * and the second an object with the properties interpolated for the given time.
 * @param {function} [options.onEnd] - Function called when the interpolation reaches the end. It receive an argument as
 * an object with the properties interpolated to its end values.
 * @returns {Promise} - A Promise that is resolved with two arguments: a <code>sweetie()</code> function to continue with
 * animation, and the {@link Sweetie} instance which properties are interpolated.
 * @module paprika-tween/sweet
 * @example
import { sweet } from 'paprika-tween';
const { sweetie } = await sweet({
    duration: 500,
    from: { size: 0 },
    to:   { size: 10 }
    render: ({ size }) => {
        obj.style.borderWidth = `${size}px`;
    }
});
await sweetie({
    duration: 1000,
    to:   { size: 20 }
});
await sweetie({
    to: { size: 1 }
});
await sweetie({
    delay: 50,
    to: { size: 100 }
});
 * @since 1.0.0
 */
export function sweet(options) {
    return new Sweetie(options).run();
}
