const POW = Math.pow;

function factorial() {
    const a = [1];
    return function (n) {
        let s = 1;
        if (a[n]) {
            return a[n];
        }
        for (let i = n; i > 1; i--) {
            s *= i;
        }
        a[n] = s;
        return s;
    };
}

function bernstein(n, i) {
    const fc = factorial();
    return fc(n) / fc(i) / fc(n - i);
}

export function Bezier(v, k) {
    let b = 0;
    const n = v.length - 1;
    for (let i = 0; i <= n; i++) {
        b += POW(1 - k, n - i) * POW(k, i) * v[i] * bernstein(n, i);
    }
    return b;
}
