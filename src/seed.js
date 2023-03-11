/**
 * Seed is the super class of {@link Spice} and {@link Recipe} animatable objects. It does not contain properties that can be interpolated, hence {@link Spice} or {@link Recipe} should be used instead.
 * @private
 * @since 1.0.0
 */
export class Seed {
    /**
     * Creates a new Seed instance.
     * @since 1.0.0
     */
    constructor() {
        this._elapsed = 0;
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
    /**
     * Jumps the interpolation to the end values (this is, moves the animation to the end).
     * @memberof Seed
     * @since 1.0.0
     */
    end() {
        this.frame(this._startTime + this.duration);
    }
    /**
     * Resets the interpolation by setting it to the initial values (this is, moves the animation to the beginning).
     * @since 1.0.0
     */
    reset() {
        this.frame(this._startTime);
    }
    /**
     * Returns whether the interpolation has started or not.
     * @returns {Boolean} - <code>true</code> if it has started, <code>false</code> otherwise.
     * @since 1.0.0
     */
    hasStarted() {
        return this._elapsed > 0;
    }
    /**
     * Returns whether the interpolation has ended or not.
     * @returns {Boolean} - <code>true</code> if it has ended, <code>false</code> otherwise.
     * @since 1.0.0
     */
    hasEnded() {
        return this._elapsed === 1;
    }
}
