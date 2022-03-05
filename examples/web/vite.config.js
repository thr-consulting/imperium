import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import visualizer from 'rollup-plugin-visualizer';

const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

export default defineConfig({
	server: {
		port: 4000,
		strictPort: true,
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		minify: true,
	},
	plugins: [
		alias({
			entries: Object.entries(tsconfig.compilerOptions.paths).map(([alias, value]) => ({
				find: new RegExp(`${alias.replace('/*', '')}`),
				replacement: resolve(process.cwd(), `${value[0].replace('/*', '')}`),
			})),
		}),
		react(),
		visualizer({
			filename: './dist/stats.html',
			gzipSize: true,
			brotliSize: true,
			template: 'treemap',
		}),
	],
});
