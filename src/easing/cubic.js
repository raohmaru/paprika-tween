export const Cubic = {
    In(t) {
        return t * t * t;
    },
    Out(t) {
        return --t * t * t + 1;
    },
    InOut(t) {
        if ((t *= 2) < 1) {
            return 0.5 * t * t * t;
        }
        return 0.5 * ((t -= 2) * t * t + 2);
    }
};
