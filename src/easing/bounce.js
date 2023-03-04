function In(t) {
    return 1 - Out(1 - t);
}

function Out(t) {
    if (t < (1 / 2.75)) {
        return 7.5625 * t * t;
    } else if (t < (2 / 2.75)) {
        return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
    } else if (t < (2.5 / 2.75)) {
        return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
    } else {
        return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
    }
}

export const Bounce = {
    In,
    Out,
    InOut(t) {
        if (t < 0.5) {
            return In(t * 2) * 0.5;
        }
        return Out(t * 2 - 1) * 0.5 + 0.5;
    }
};
