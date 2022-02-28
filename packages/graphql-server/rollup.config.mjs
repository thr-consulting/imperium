import {rollupLibConfig} from '@thx/rollup-config-thx';
import graphql from '@rollup/plugin-graphql';

const config = rollupLibConfig({
	name: '@imperium/connector',
	type: 'node',
});

export default {
	...config,
	plugins: [
		...config.plugins,
		graphql(),
	],
};
