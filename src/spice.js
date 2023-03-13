import { Seed } from './seed.js';

const defaults = {
    duration: 0,
    delay: 0,
    from: {},
    to: {},
    easing: (t) => t, // Linear.None
    render: () => { },
    onEnd: () => { }
};

/**
 * A Spice is an animatable object which properties can be interpolated from its starting
 * value(s) to its end value(s), using an easing function.
 * @example
import { Spice } from 'paprika';
import { Cubic } from 'paprika/easing';
const spice = new Spice({
    duration: 45,
    delay: 2,
    easing: Cubic.InOut,
    from: { size: 10 },
    to: { size: 520 },
    render: (v, props) => {
       console.log(props.size);
    },
    onEnd: (props) => console.log(props)
});
spice.start(0);
spice.frame(15);
 * @since 1.0.0
 */
export class Spice extends Seed {
    /**
     * Creates a new Spice instance with the given options.
     * @param {Object} options
     * @param {number} options.duration - The duration of the interpolation. The time scale should be the same as the
     * starting time and the [frame()]{@linkcode Spice#frame} time.
     * @param {number} [options.delay] - The delay time to start the interpolation.
     * @param {Object} options.from - An object with key/value pairs of numeric properties to interpolate from.
     * @param {Object} options.to - An object with the numeric properties to interpolate to.
     * @param {function} [options.easing] - The easing function with which calculate the value of the property at a given time.
     * You can use your custom function or a function available at [paprika/easing]{@link module:paprika/easing}.
     * Default is <code>Linear.None</code>.
     * @param {function} options.render - A callback function that will be called after each [render]{@linkcode Spice#frame}.
     * It receives two arguments: the first being the amount of interpolation applied from <code>0</code> to <code>1</code>,
     * and the second an object with the properties interpolated for the given time.
     * @param {function} [options.onEnd] - Function called when the interpolation reaches the end. It receive an argument as
     * an object with the properties interpolated to its end values.
     * @since 1.0.0
     */
    constructor(options) {
        super();
        Object.assign(this, defaults, options);
    }
    /**
     * Sets the starting time of the interpolation at the given <code>time</code> argument.<br>
     * If <code>time</code> is not provided, the timestamp from
     * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
     * will be used instead.
     * @param {(DOMHighResTimeStamp|number)} [time] - The initial number from where to start the animation.
     * @since 1.0.0
    * @example
import { Spice } from 'paprika';
const spice = new Spice({ ... });
spice.start(5);
     */
    start(time) {
        this._startTime = time ?? performance.now();
        this._startTime += this.delay;
        this._interpolated = Object.assign(Object.create(null), this.to);
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
import { Spice } from 'paprika';
const spice = new Spice({
    duration: 10,
    from: { width: 100 },
    to: { width: 550 },
    render: (v, props) => { ... }
});
spice.start(0);
spice.frame(2);
     */
    frame(time) {
        time ??= performance.now();
        let elapsed = this.elapse(time);
        // Don't render if the elapsed time has not changed
        if (this._elapsed === elapsed) {
            return;
        }
        this._elapsed = elapsed;
        const value = this.easing(elapsed);
        let start,
            end,
            key;
        for (key in this._interpolated) {
            start = this.from[key] ?? 0;
            end = this.to[key];
            this._interpolated[key] = start + (end - start) * value;
        }
        this.render(value, this._interpolated, this);
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
}
