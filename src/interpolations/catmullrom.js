const FLOOR = Math.floor;

function catmullrom(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5,
        v1 = (p3 - p1) * 0.5,
        t2 = t * t,
        t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}

export function CatmullRom(v, k) {
    let i = FLOOR(f),
        f = m * k;
    const m = v.length - 1;
    if (v[0] === v[m]) {
        if (k < 0) {
            i = FLOOR(f = m * (1 + k));
        }
        return catmullrom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
        if (k < 0) {
            return v[0] - (catmullrom(v[0], v[0], v[1], v[1], -f) - v[0]);
        }
        if (k > 1) {
            return v[m] - (catmullrom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
        }
        return catmullrom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
}
