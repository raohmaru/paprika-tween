const defaults = {
    duration: 0,
    delay: 0,
    easing: (t) => t, // Linear.None
    render: () => { },
    onEnd: () => { },
    from: {},
    to: {}
};

export class Spice {
    constructor(options) {
        Object.assign(this, defaults, options);
    }

    start(time) {
        this._startTime = time ?? window.performance.now();
        this._startTime += this.delay;
        this._interpolated = Object.assign(Object.create(null), this.from);
    }

    end() {
        this.frame(this._startTime + this.duration);
    }

    frame(time) {
        time ??= window.performance.now();
        if (time < this._startTime) {
            return true;
        }
        let elapsed = (time - this._startTime) / this.duration;
        if (elapsed > 1) {
            elapsed = 1;
        }
        const value = this.easing(elapsed);
        let start,
            end;
        for (let key in this.to) {
            start = this.from[key] ?? 0;
            end = this.to[key];
            this._interpolated[key] = start + (end - start) * value;
        }
        this.render(value, this._interpolated, this);
        if (elapsed === 1) {
            this.onEnd(this._interpolated, this);
            return false;
        }
        return true;
    }

    dispose() {
        this.from = null;
        this.to = null;
        this.render = null;
        this.onEnd = null;
    }
}
