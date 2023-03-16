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
}
