import graphql from '@rollup/plugin-graphql';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild-transform';
import {resolve} from 'node:path';
import aliasPlugin from '@rollup/plugin-alias';
import {readFileSync} from 'node:fs';
import delPlugin from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import {visualizer} from 'rollup-plugin-visualizer';
import manifest from 'rollup-plugin-output-manifest';

const isWatching = process.env.ROLLUP_WATCH;

const tsconfigPath = resolve(process.cwd(), 'tsconfig.rollup.es6.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
const extensions = ['.js', '.ts', '.tsx'];

const commonOutput = {
	name: 'imperium_example_web',
};

const config = {
	input: 'src/index.tsx',
	output: [
		{
			...commonOutput,
			format: 'esm',
			dir: 'dist/esm',
			// manualChunks: {
				// vendor: ['react', 'react-dom'],
				// imperium: ['@imperium/client'],
			// },
			plugins: [
				visualizer({
					filename: 'stats-esm.html',
				}),
			],
		},
		{
			...commonOutput,
			format: 'iife',
			dir: 'dist/iife',
			inlineDynamicImports: true,
			plugins: [
				visualizer({
					filename: 'stats-iife.html',
				}),
			],
		},
	],
	plugins: [
		delPlugin({
			targets: ['dist/*'],
		}),
		nodeResolve({
			extensions,
			browser: true,
		}),
		aliasPlugin({
			entries: Object.entries(tsconfig.compilerOptions.paths).map(([alias, value]) => ({
				find: new RegExp(`${alias.replace('/*', '')}`),
				replacement: resolve(process.cwd(), `${value[0].replace('/*', '')}`),
			})),
		}),
		commonjs({
			// include: ['node_modules/**'],
		}),
		// globals(),
		// builtins(),
		// graphql(),
		// postcss({
		// 	autoModules: true,
		// }),
		esbuild([
			{
				loader: 'tsx',
			},
			{
				loader: 'ts',
			},
			{
				output: true,
				minify: false,
				target: 'es6',
				tsconfigRaw: tsconfig,
				sourcemap: 'external',
			}
		]),
		// esbuild({
		// 	minify: false,
		// 	sourceMap: false,
		// 	tsconfig: tsconfigPath,
		// 	target: 'es6',
		// }),
		// serve({
		// 	verbose: true,
		// 	contentBase: 'dist/esm',
		// }),
		manifest.default(),
		// html(),
	],
};

export default config;
