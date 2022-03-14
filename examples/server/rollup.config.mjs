import {rollupLibConfig} from '@thx/rollup-config-thx';
import graphql from '@rollup/plugin-graphql';

const isWatching = process.env.ROLLUP_WATCH;

export default rollupLibConfig({
	name: '@imperium/example-server',
	type: 'node',
	run: isWatching && '--enable-source-maps index.js',
}, {
	watch: {
		clearScreen: !isWatching,
	},
	plugins: [
		graphql(),
	],
});
