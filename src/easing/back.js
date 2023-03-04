const s = 1.70158;
const sa = 1.70158 * 1.525;

export const Back = {
    In(t) {
        return t * t * ((s + 1) * t - s);
    },
    Out(t) {
        return --t * t * ((s + 1) * t + s) + 1;
    },
    InOut(t) {
        if ((t *= 2) < 1) {
            return 0.5 * (t * t * ((sa + 1) * t - sa));
        }
        return 0.5 * ((t -= 2) * t * ((sa + 1) * t + sa) + 2);
    }
};
