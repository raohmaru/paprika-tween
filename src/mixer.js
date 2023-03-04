export function Mixer() {
    const spices = [];
    return {
        add(...rest) {
            for (let i = 0; i < rest.length; i++) {
                spices.push(rest[i]);
            }
            return this;
        },

        start(time) {
            spices.forEach((spice) => spice.start(time));
        },

        clear() {
            spices.forEach((spice) => spice.dispose());
            spices.length = 0;
            return this;
        },

        frame(time) {
            spices.forEach((spice) => spice.frame(time));
        }
    };
}
