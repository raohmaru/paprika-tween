export class Mortar {
    constructor(fps = 60, cb) {
        this._fps = fps;
        this._cb = cb;
        this._fpsInterval = 1000 / fps;
        this._currentTime = 0;
        this._pausedTime = 0;
        this._running = false;
    }

    start(cb) {
        if (cb) {
            this._cb = cb;
        }
        this._startTime = window.performance.now();
        this._previousTime = this._startTime;
        this._previousDeltaTime = this._startTime;
        this._running = true;
        // Wrapper to keep the scope (faster than .bind()?)
        this._onFrame = (currentTime) => this.frame(currentTime);
        this.frame(this._startTime);
    }

    pause() {
        this._running = false;
    }

    resume() {
        const now = window.performance.now();
        this._pausedTime += now - this._previousTime;
        this._running = true;
        this.frame(now);
    }

    stop() {
        this.pause();
        this._cb = null;
        this._onFrame = null;
    }

    frame(currentTime) {
        if (!this._running) {
            return;
        }
        // Calculate elapsed time since last loop
        let delta = currentTime - this._previousDeltaTime;
        // If enough time has elapsed, draw the next frame
        if (delta >= this._fpsInterval) {
            // Adjust next execution time in case this frame took longer to execute
            this._previousDeltaTime = currentTime - (delta % this._fpsInterval);
            this._cb(currentTime - this._previousTime, currentTime - this._pausedTime);
            this._previousTime = currentTime;
        }
        this._currentTime = currentTime;
        if (this._onFrame) {
            window.requestAnimationFrame(this._onFrame);
        }
    }

    get running() {
        return this._running;
    }

    get time() {
        return this._previousTime - this._pausedTime;
    }
}
