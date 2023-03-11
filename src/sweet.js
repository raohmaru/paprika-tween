import { Spice, Mortar } from './index.js';

/**
 * Class representing a duck.
 * @augments Spice
 * @private
 */
class Sweetie extends Spice {
    constructor(options) {
        super(options);
        this._mortar = new Mortar((delta, time) => this.frame(time));
    }

    start() {
        this._mortar.start();
        super.start(this._mortar.time);
    }

    pause() {
        this._mortar.pause();
    }

    resume() {
        this._mortar.resume();
    }

    dispose() {
        super.dispose();
        this._mortar.stop();
        this._mortar = null;
    }

    async run(config) {
        return new Promise((resolve) => {
            this.onEnd = function () {
                this.pause();
                resolve({
                    sweetie: this.run.bind(this),
                    spice: this
                });
            };
            if (config) {
                this.from = this.to;
                Object.assign(this, config);
            }
            this.start();
        });
    }

    get running() {
        return this._mortar.running;
    }
}

export function sweet(config) {
    return new Sweetie(config).run();
}
