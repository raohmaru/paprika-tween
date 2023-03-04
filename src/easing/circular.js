const sqrt = Math.sqrt;

export const Circular = {
    In(t) {
        return 1 - sqrt(1 - t * t);
    },
    Out(t) {
        return sqrt(1 - (--t * t));
    },
    InOut(t) {
        if ((t *= 2) < 1) {
            return - 0.5 * (sqrt(1 - t * t) - 1);
        }
        return 0.5 * (sqrt(1 - (t -= 2) * t) + 1);
    }
};
