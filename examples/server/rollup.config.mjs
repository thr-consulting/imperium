import {rollupLibConfig} from '@thx/rollup-config-thx';
import graphql from '@rollup/plugin-graphql';

const isWatching = process.env.ROLLUP_WATCH;

export default rollupLibConfig({
	name: '@imperium/example-server',
	type: 'node',
	run: isWatching && 'start.dev',
}, {
	watch: {
		clearScreen: !isWatching,
	},
	plugins: [
		graphql(),
	],
});
