import {rollupLibConfig} from '@thx/rollup-config-thx';

const isWatching = process.env.ROLLUP_WATCH;

export default rollupLibConfig({
	name: '@imperium/example-server',
	type: 'node',
	run: isWatching && 'start.dev',
}, {
	watch: {
		clearScreen: !isWatching,
	},
});
