export class Mixer {
    constructor();

    add(...args: (Spice|Recipe)[]): Mixer;

    dispose(): void;

    frame(time: (DOMHighResTimeStamp|number)[]): void;

    start(time: (DOMHighResTimeStamp|number)[]): Mixer;

}

export class Mortar {
    constructor();

    frame(currentTime: (DOMHighResTimeStamp|number)[]): void;

    pause(): void;

    resume(): void;

    start(): void;

    stop(): void;

    readonly running: Boolean;

    readonly time: DOMHighResTimeStamp;
}

export class Recipe {
    constructor(options: {
        onEnd: Function;
    });

    add(...args: Spice[]): Recipe;

    dispose(): void;

    frame(time: (DOMHighResTimeStamp|number)[]): void;

    start(time: (DOMHighResTimeStamp|number)[]): Recipe;
}

export class Spice {
    constructor(options: {
        duration: number;
        delay: number;
        from: Object;
        to: Object;
        easing: Function;
        render: Function;
        onEnd: Function;
    });

    dispose(): void;

    frame(time: (DOMHighResTimeStamp|number)[]): void;

    start(time: (DOMHighResTimeStamp|number)[]): void;

    update(options: {
        duration: number;
        delay: number;
        from: Object;
        to: Object;
        easing: Function;
        render: Function;
        onEnd: Function;
    }): Spice;
}

export function sweet(options: {
    duration: number;
    delay: number;
    from: Object;
    to: Object;
    easing: Function;
    render: Function;
    onEnd: Function;
}): Promise<{sweetie: Function, spice: Spice}>;

