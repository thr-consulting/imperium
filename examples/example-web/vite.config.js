import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import visualizer from 'rollup-plugin-visualizer';
import graphql from '@rollup/plugin-graphql';
import {dependencies} from './package.json';

const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

// Creates 1 chunk per dependency
function chunkPerDep(deps) {
	let chunks = {};
	Object.keys(deps).forEach(key => {
		// if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

// Creates 1 chunk for all dependencies (fixes monorepo problem)
function vendorChunk(deps) {
	return {
		vendor: Object.keys(deps),
	};
}

// Creates chunks from a map of regexes, chunks not mapped are added to vendor chunk
function chunkMap(deps, reMap) {
	let sourceDeps = {...deps};
	let chunks = {
		vendor: [],
	};
	Object.keys(reMap).forEach(reKey => {
		chunks[reKey] = [];
		Object.keys(sourceDeps).forEach(key => {
			if (reMap[reKey].test(key)) {
				chunks[reKey].push(key);
				delete sourceDeps[key];
			}
		});
	});
	return {chunks, deps: sourceDeps};
}

// Creates 1 chunk per regex map and then 1 chunk per @namespace dependencies and then 1 vendor chunk for everything else
function chunksNamespace(deps, reMap) {
	const y = chunkMap(deps, {react: /^react/});
	let hunks = {
		vendor: [],
		...y.chunks,
	};
	Object.keys(y.deps).forEach(key => {
		const m = /^@([A-Za-z-_]+)\/.*/.exec(key);
		if (m) {
			if (hunks[m[1]]) {
				hunks[m[1]].push(key);
			} else {
				hunks[m[1]] = [key];
			}
		} else {
			hunks['vendor'].push(key);
		}
	});
	return hunks;
}

export default defineConfig({
	server: {
		port: 4000,
		strictPort: true,
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		minify: true,
		rollupOptions: {
			output: {
				manualChunks: {
					...chunksNamespace(dependencies, {react: /^react/}),
				},
			},
		},
	},
	plugins: [
		alias({
			entries: Object.entries(tsconfig.compilerOptions.paths).map(([alias, value]) => ({
				find: new RegExp(`${alias.replace('/*', '')}`),
				replacement: resolve(process.cwd(), `${value[0].replace('/*', '')}`),
			})),
		}),
		react(),
		graphql(),
		visualizer({
			filename: './dist/stats.html',
			gzipSize: true,
			brotliSize: true,
			template: 'treemap', // treemap, sunburst
		}),
	],
});
