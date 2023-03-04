export const Quadratic = {
    In(t) {
        return t * t;
    },
    Out(t) {
        return t * (2 - t);
    },
    InOut(t) {
        if ((t *= 2) < 1) {
            return 0.5 * t * t;
        }
        return - 0.5 * (--t * (t - 2) - 1);
    }
};
