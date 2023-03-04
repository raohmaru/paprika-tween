export const Elastic = {
    In(t) {
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    },
    Out(t) {
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
    },
    InOut(t) {
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        t *= 2;
        if (t < 1) {
            return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
        }
        return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
    }
};
