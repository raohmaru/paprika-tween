export const Sinusoidal = {
    In(t) {
        return 1 - Math.cos(t * Math.PI / 2);
    },
    Out(t) {
        return Math.sin(t * Math.PI / 2);
    },
    InOut(t) {
        return 0.5 * (1 - Math.cos(Math.PI * t));
    }
};
