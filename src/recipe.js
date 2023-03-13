import { Seed } from './seed.js';

const defaults = {
    onEnd: () => { }
};

/**
 * A Recipe object can contain any number of [spices]{@link Spice} which will be interpolated <i>sequentially</i>, this is, one each another.
 * @example
import { Mixer, Recipe, Spice } from 'paprika';
const spice1 = new Spice({ ... });
const spice2 = new Spice({ ... });
const recipe = new Recipe({ onEnd: (r) => console.log(r) });
recipe.add(spice1, spice2);
const mixer = new Mixer();
mixer.add(recipe)
     .start();
function loop(timestamp) {
    mixer.frame(timestamp);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
 * @since 1.0.0
 */
export class Recipe extends Seed {
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
        this._spices = [];
    }
    /**
     * Adds one or more [spices]{@link Spice}.
     * @param {...Spice} rest - Instances of {@link Spice} objects.
     * @returns {Recipe} - The current instance of the Recipe.
     * @since 1.0.0
    * @example
import { Recipe, Spice } from 'paprika';
const spice1 = new Spice({ ... });
const spice2 = new Spice({ ... });
new Recipe().add(spice1, spice2);
     */
    add(...rest) {
        for (let i = 0; i < rest.length; i++) {
            this._spices.push(rest[i]);
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
import { Recipe } from 'paprika';
const recipe = new Recipe();
recipe.start(1000);
     */
    start(time) {
        let spice;
        let duration = 0;
        for (let i = 0; i < this._spices.length; i++) {
            spice = this._spices[i];
            spice.delay += duration;
            spice.start(time);
            duration = spice.duration + spice.delay;
        }
        this._startTime = this._spices[0]._startTime;
        this.duration = duration;
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
import { Recipe, Spice } from 'paprika';
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
        if (!this._spices.length) {
            return;
        }
        time ??= performance.now();
        let elapsed = this.elapse(time);
        // Don't render if the elapsed time has not changed
        if (this._elapsed === elapsed) {
            return;
        }
        this._elapsed = elapsed;
        for (let i = 0; i < this._spices.length; i++) {
            this._spices[i].frame(time);
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
        for (let i = this._spices.length - 1; i !== -1; i--) {
            this._spices[i].dispose();
        }
        this._spices.length = 0;
        this.onEnd = null;
    }
}
