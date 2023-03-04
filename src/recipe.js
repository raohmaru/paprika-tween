export class Recipe {
    constructor(onEnd = () => { }) {
        this._onEnd = onEnd;
        this._spices = [];
    }

    add(...rest) {
        for (let i = 0; i < rest.length; i++) {
            this._spices.push(rest[i]);
        }
        return this;
    }

    start(time) {
        this._i = 0;
        this._spices[this._i].start(time);
        return this;
    }

    frame(time) {
        if (!this._spices.length || this._i === this._spices.length) {
            return false;
        }
        const spice = this._spices[this._i];
        if (!spice.frame(time)) {
            this._i++;
            if (this._i < this._spices.length) {
                this._spices[this._i].start(spice._startTime + spice.duration);
            } else {
                this._onEnd(this);
            }
        }
        return true;
    }

    dispose() {
        for (let i = this._spices.length - 1; i !== -1; i--) {
            this._spices[i].dispose();
        }
        this._spices.length = 0;
        this._onEnd = null;
    }
}
