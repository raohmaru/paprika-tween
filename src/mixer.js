/**
 * Creates a Mixer instance, which can hold different [spices]{@link Spice} or [recipes]{@link Recipe} that will be animated at the same time.<br><br>
 * Note that a Mixer instance does not play the animation by itself. Its method [frame()]{@linkcode Mixer#frame}
 * must be called in order to execute the interpolations of each animatable object, with methods like
 * [requestAnimationFrame()]{@link https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame}
 * or an instance of the {@link Mortar} class.
 * @example
import { Mixer, Spice } from 'paprika';
const spice = new Spice({
    duration: 1000,
    from: { x: 0 },
    to: { x: 200 },
    render: (v, props) => {
       console.log(props.x);
    }
});
const mixer = new Mixer();
mixer.add(spice)
     .start();
function loop(timestamp) {
    mixer.frame(timestamp);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
 * @since 1.0.0
 */
export class Mixer {
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
import { Mixer, Spice } from 'paprika';
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
import { Mixer } from 'paprika';
const mixer = new Mixer();
mixer.start(0);
     */
    start(time) {
        for (let i = 0; i < this.spices.length; i++) {
            this.spices.start(time);
        }
        return this;
    }
    /**
     * Stops all animations and clears the stack of animatable objects.
     * @since 1.0.0
     */
    dispose() {
        for (let i = 0; i < this.spices.length; i++) {
            this.spices.dispose();
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
import { Mixer, Spice } from 'paprika';
const spice = new Spice({
    duration: 10,
    from: { width: 100 },
    to: { width: 550 },
    render: (v, props) => { ... }
});
const mixer = new Mixer(0);
mixer.add(spice)
     .start();
mixer.frame(1);
     */
    frame(time) {
        for (let i = 0; i < this.spices.length; i++) {
            this.spices.frame(time);
        }
    }
}
