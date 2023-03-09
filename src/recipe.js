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
export class Recipe {
    /**
     * Creates a new Recipe instance with the given options.
     * @param {Object} options
     * @param {function} [options.onEnd] - Function called when the last {@link Spice} reaches the end of the interpolation.
     * It receives the current instance as an argument.
     * @since 1.0.0
     */
    constructor(options) {
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
        time ??= window.performance.now();
        let spice;
        let startTime = time;
        for (let i = 0; i < this._spices.length; i++) {
            spice = this._spices[i];
            spice.start(startTime);
            startTime += spice.duration;
        }
        this._startTime = time;
        this.duration = startTime - time;
        this._i = 0;
        return this;
    }
    /**
     * Returns the active recipe for the given time.
     * @private
     * @param {(DOMHighResTimeStamp|number)} time - The time to guess the active recipe.
     * @returns {Spice} - The active spice.
     * @since 1.0.0
     */
    _getSpice(time) {
        if (time <= this._startTime) {
            return this._spices[0];
        }
        if (time >= this.duration) {
            return this._spices.at(-1);
        }
        // Tries to guess the spice by the time
        let n = ((time - this._startTime) * this._spices.length) / this.duration | 0;
        let spice;
        let endTime;
        while (true) {
            spice = this._spices[n];
            endTime = spice._startTime + spice.duration;
            if (time < spice._startTime) {
                // Tries to guess the spice by halving the time before the current spice starts
                n = (((spice._startTime - this._startTime) * 0.5) * this._spices.length) / this.duration | 0;
            } else if (time > endTime) {
                // Tries to guess the spice by adding half of the remaining time to the end of the current spice
                n = ((spice.duration + (this.duration - spice.duration) * 0.5 - this._startTime ) * this._spices.length) / this.duration | 0;
            } else {
                break;
            }
        }
        this._i = n;
        return this._spices[n];
    }
    /**
     * Moves the interpolation of the properties of the active spice in the recipe by the given time, which is
     * relative to the starting time.<br>
     * If <code>time</code> is not provided, the timestamp from
     * [performance.now()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
     * will be used instead.
     * @param {(DOMHighResTimeStamp|number)} [time] - The amount of time to interpolate since the animations started.
     * @returns {Boolean} - Whether the recipe is in progress (true) or it has reached the end (false).
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
        time ??= window.performance.now();
        if (!this._spices.length) {
            return false;
        }
        let spice = this._spices[this._i];
        if (time < spice._startTime || time > spice._startTime + spice.duration) {
            spice = this._getSpice(time);
        }
        let i = this._spices.length;
        let tmpSpice;
        while(--i >= 0) {
            if (i === this._i) {
                continue;
            }
            tmpSpice = this._spices[i];
            // Ends previous animations that have not properly ended
            if (i < this._i) {
                if (!tmpSpice.hasEnded()) {
                    tmpSpice.end();
                }
            // Resets following animations that may have started
            } else if (tmpSpice.hasStarted()) {
                tmpSpice.reset();
            }
        }
        if (!spice.frame(time)) {
            if (spice === this._spices.at(-1)) {
                this.onEnd(this);
                return false;
            } else {
                this._i++;
            }
        }
        return true;
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
