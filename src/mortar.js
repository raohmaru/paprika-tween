/**
 * The Mortar class will call the callback function at the given [frame rate]{@link https://en.wikipedia.org/wiki/Frame_rate}
 * defined by the <code>fps</code> argument (frames per second or times per second).
 * <br>
 * Mortar can be used to perform an animation through a {@link Mixer}, {@link Spice} or {@link Recipe} by calling its
 * <code>frame()</code> method as the callback function. The interpolations will be updated before the next repaint.
 * <br><br>
 * It tries to honors the given <code>fps</code> value, so consecutive calls to the callback function will run at the same
 * speed regardless on the performance of the device or the refresh rate of the screen. However, to ensure a consistent animation,
 * be sure to use the <code>delta</code> argument passed to the callback function to calculate how much the animation
 * will progress in a frame.
 * @example
import { Mixer, Spice, Mortar } from 'paprika-tween';
const spice = new Spice({
    duration: 5000,
    from: { scale: 1 },
    to: { scale: 2.5 },
    render: (props, interpolation) => { ... }
});
const mixer = new Mixer();
mixer.add(spice)
     .start();
const mortar = new Mortar((time) => mixer.frame(time));
mortar.start();
 * @since 1.0.0
 */
export class Mortar {
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
        this._fpsInterval = 1000 / fps;
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
        // Wrapper to keep the scope (faster than .bind()?)
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
        // Calculate elapsed time since last loop
        let delta = currentTime - this._previousDeltaTime;
        // If enough time has elapsed, draw the next frame
        if (delta >= this._fpsInterval) {
            // Adjust next execution time in case this frame took longer to execute
            this._previousDeltaTime = currentTime - (delta % this._fpsInterval);
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
}
