const FLOOR = Math.floor;

function linear(p0, p1, t) {
    return (p1 - p0) * t + p0;
}

export function Linear(v, k) {
    const m = v.length - 1,
        f = m * k,
        i = FLOOR(f);
    if (k < 0) {
        return linear(v[0], v[1], f);
    }
    if (k > 1) {
        return linear(v[m], v[m - 1], m - f);
    }
    return linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
}
