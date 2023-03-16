import * as esbuild from 'esbuild';

const env = process.argv[2]?.split('=')?.pop() || 'dev';
const outDir = './dist';
const platform = {
    node: 'node'
};
const target = {
    node: ['node14']
};
const format = {
    iife: 'iife',
    node: 'cjs'
};
const outfile = {
    dev:  `${outDir}/[name].js`,
    prod: `${outDir}/[name].min.js`,
    iife:  `${outDir}/[name].iife.min.js`,
    node: `${outDir}/[name].cjs`
};
const globalName =  {
    iife: '[name]'
};

function getConfig(src, name, gName, env) {
    return {
        entryPoints: [src],
        outfile: outfile[env].replace('[name]', name),
        bundle: true,
        sourcemap: env === 'dev',
        minify: env === 'prod' || env === 'iife',
        platform: platform[env] || 'browser',
        target: target[env] || ['es2020'],
        format: format[env] || 'esm',
        globalName: globalName[env]?.replace('[name]', gName),
        banner: {
            js: '/*! For license information please see https://github.com/raohmaru/paprika-tween/blob/master/LICENSE */'
        },
        logLevel: 'info'
    };
}

await esbuild.build(getConfig('src/index.js', 'paprika-tween', 'Paprika', env));
await esbuild.build(getConfig('src/easing/index.js', 'easing', 'Easing', env));