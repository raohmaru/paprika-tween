/**
 * [Easing equations]{@link http://robertpenner.com/easing/} are used to calculate the amount of progression of a value over time.<br>
 * In Paprika 🌶 you can use the following easing equations to give a more natural movement to the animations of the spices.
 *
 * @example
import { Spice } from 'paprika-tween';
import { Elastic } from 'paprika-tween/easing';
const spice = new Spice({
    duration: 120,
    easing: Elastic.InOut,
    from: { rotation: 10 },
    to: { rotation: 520 },
    render: ({ rotation }) => { ... }
});
spice.start();
(function loop(timestamp) {
    spice.frame(timestamp);
    requestAnimationFrame(loop);
})()
 * @module paprika-tween/easing
 * @since 1.0.0
 */

export { Linear } from './linear.js';
export { Sinusoidal } from './sinusoidal.js';
export { Quadratic } from './quadratic.js';
export { Cubic } from './cubic.js';
export { Quartic } from './quartic.js';
export { Quintic } from './quintic.js';
export { Exponential } from './exponential.js';
export { Circular } from './circular.js';
export { Back } from './back.js';
export { Elastic } from './elastic.js';
export { Bounce } from './bounce.js';
