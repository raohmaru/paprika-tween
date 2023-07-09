// Modules
import { Mixer, Spice, Recipe, Mortar, sweet } from '../src/index.js';
import { Cubic, Elastic, Sinusoidal } from '../src/easing/index.js';
// import { Mixer, Spice, Recipe, Mortar, sweet } from '../dist/paprika-tween.min.js';
// import { Cubic, Elastic, Sinusoidal } from '../dist/easing.min.js';

// Global
// const { Mixer, Spice, Recipe, Mortar, sweet } = Paprika;
// const { Cubic, Elastic, Sinusoidal } = Easing;

const $output = document.getElementById('output');
const $toy1 = document.getElementById('toy1');
const $toy2 = document.getElementById('toy2');

const spiceA = new Spice({
    duration: 1,
    from: { radius: 50 },
    to: { radius: 0 },
    render: ({radius}) => {
        $toy2.style.borderRadius = `${radius}%`;
    },
    onEnd: (props) => console.log('spiceA')
});
const spiceB = new Spice({
    duration: 1,
    delay: 2,
    from: { opacity: 1 },
    to: { opacity: 0 },
    render: (props) => {
        $toy2.style.opacity = `${props.opacity}`;
    },
    onEnd: (props) => console.log('spiceB')
});
const spiceX = new Spice({
    duration: 1,
    easing: Cubic.InOut,
    from: { x: 0 },
    to: { x: 200 },
    render: (props, v) => {
        $toy1.style.left = `${props.x}px`;
        $output.textContent = `left: ${v} / ${props.x}`;
    },
    onEnd: (props) => console.log(props)
});
const spiceC = new Spice({
    duration: 0.5,
    to: {
        color: 16777215
    },
    render: (props) => {
        const hex = props.color.toFixed();
        const r = (hex >> 16) & 0xFF;
        const g = (hex >> 8) & 0xFF;
        const b = hex & 0xFF;
        $toy1.style.background = `rgb(${r} ${g} ${b})`;
        $output.textContent = `color: ${$toy1.style.background}`;
    }
});
const spiceY = new Spice({
    duration: 2,
    from: { y: 0 },
    to: { y: 200 },
    render: (props, v) => {
        $toy1.style.paddingTop = `${props.y}px`;
        $output.textContent = `paddingTop: ${v} / ${props.y}`;
    }
});
const spiceR = new Spice({
    duration: 0.5,
    from: { rotation: 0 },
    to:   { rotation: 360 },
    render: (props, v) => {
        $toy1.style.transform = `rotate(${props.rotation}deg)`;
        $output.textContent = `rotation: ${v} / ${props.rotation}`;
    }
});
const mixer = new Mixer();
mixer.add(spiceA, spiceB);
mixer.add(new Recipe({onEnd:(r) => console.log('Recipe end', r)}).add(spiceX, spiceC, spiceY, spiceR));
mixer.start(0);
document.getElementById('ruler').addEventListener('input', e => {
    mixer.frame(parseFloat(e.currentTarget.value));
});

// ---------------------------------------------------------------
let spiceS;
const mortar = new Mortar((time, delta) => spiceS.frame());
$toy1.addEventListener('click', e => {
    const size = $toy1.clientWidth;
    spiceS = new Spice({
        duration: 1000,
        easing: Cubic.Out,
        from: {
            width: size,
            height: size
        },
        to: {
            width: size + 25,
            height: size + 25
        },
        render: (props, v) => {
            $toy1.style.width = `${props.width}px`;
            $toy1.style.height = `${props.height}px`;
            $output.textContent = `size: ${v} / ${props.width}`;
        },
        onEnd: (props, spice) => {
            mortar.pause();
            spice.dispose();
        }
    });
    spiceS.start();
    mortar.start();
});

// ---------------------------------------------------------------
const $play = document.getElementById('play');
const recipe = new Recipe({ onEnd: (recipe) => {
    // recipe.dispose();
    mortero.stop();
    mortero = null;
    $play.textContent = '▶';
}})
    .add(
        new Spice({
            duration: 1000,
            easing: Elastic.Out,
            from: { rotation: 0 },
            to:   { rotation: 360 },
            render: (props, v) => {
                $toy1.style.transform = `rotate(${props.rotation}deg)`;
                $output.textContent = `rotation: ${v} / ${props.rotation}`;
            }
        }),
        new Spice({
            duration: 1000,
            easing: Elastic.In,
            from: { rotation: 360 },
            to:   { rotation: 0 },
            render: (props, v) => {
                $toy1.style.transform = `rotate(${props.rotation}deg)`;
                $output.textContent = `rotation: ${v} / ${props.rotation}`;
            }
        })
    );
let mortero;
$play.addEventListener('click', e => {
    e.currentTarget.textContent = mortero?.running ? '▶' : '⏸︎';
    if (mortero) {
        mortero.running ? mortero.pause() : mortero.resume();
        return;
    }
    recipe.start();
    mortero = new Mortar((time, delta) => {
        recipe.frame(time);
    });
    mortero.start();
});

// ---------------------------------------------------------------
let globalSpice;
document.getElementById('sweet').addEventListener('click', async (e) => {
    if (globalSpice) {
        globalSpice.running ? globalSpice.pause() : globalSpice.resume();
        return;
    }
    const { sweetie, spice } = await sweet({
        render: (props, v) => {
            $toy1.style.borderWidth = `${props.size}px`;
            $output.textContent = `border: ${v} / ${props.size}`;
        }
    });
    globalSpice = spice;
    await sweetie({
        duration: 1000,
        from: { size: 1 },
        to:   { size: 20 }
    });
    await sweetie({
        to: { size: 1 }
    });
    await sweetie({
        to: { size: 100 }
    });
    spice.dispose();
    globalSpice = null;
});

// ---------------------------------------------------------------
;(function (){
    const $canvas = document.getElementById('canvas');
    // const ctx = $canvas.getContext('bitmaprenderer', { alpha: false });
    const ctx = $canvas.getContext('2d', { alpha: false });
    const {width, height} = canvas;
    const offscreen = new OffscreenCanvas(width, height);
    const offCtx = offscreen.getContext('2d', { alpha: false });
    const w2 = width >> 1;
    const h2 = height >> 1;
    const side = Math.sqrt(width * width + height * height);
    const mixer = new Mixer();
    const PI2 = Math.PI * 2;
    function randomize() {
        const angle = Math.random() * PI2;
        return {
            duration : Math.random() * 1000 + 3000,
            from : {
                x: w2,
                y: h2,
                size: 2
            },
            to : {
                x: Math.sin(angle) * side + w2,
                y: Math.cos(angle) * side + h2,
                size: Math.random() * 48 + 2
            }
        }
    }
    mixer.add(...(function() {
        return [...new Array(1000)].map(() => {
            const angle = Math.random() * PI2;
            return new Spice({
                ...randomize(),
                easing: Cubic.InOut,
                render: (props, v, spice) => {
                    offCtx.fillStyle = 'green';
                    offCtx.fillRect(
                        props.x | 0,
                        (props.y - (200 * Sinusoidal.In(spice.elapsed))) | 0,
                        props.size | 0,
                        props.size | 0
                    );
                },
                onEnd: (props, spice) => {
                    spice.update(randomize());
                    spice.start();
                }
            });
        });
    }()))
        .start();
    function renderCanvas() {
        offCtx.fillStyle = 'rgba(255 255 255 / 0.1)';
        offCtx.fillRect(0, 0, width, height);
        mixer.frame();
        // ctx.transferFromImageBitmap(offscreen.transferToImageBitmap());  // bitmaprenderer
        ctx.drawImage(offscreen, 0, 0);
        rafID = requestAnimationFrame(renderCanvas);
    }
    let rafID = requestAnimationFrame(renderCanvas);
    $canvas.addEventListener('click', () => {
        if (rafID) {
            cancelAnimationFrame(rafID);
            rafID = null;
        } else {
            renderCanvas();
        }
    });
})();
