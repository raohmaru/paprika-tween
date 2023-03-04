export const Quartic = {
    In(t) {
        return t * t * t * t;
    },
    Out(t) {
        return 1 - (--t * t * t * t);
    },
    InOut(t) {
        if ((t *= 2) < 1) {
            return 0.5 * t * t * t * t;
        }
        return - 0.5 * ((t -= 2) * t * t * t - 2);
    }
};
