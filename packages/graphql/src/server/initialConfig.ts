import {InitialConfig} from '@imperium/core';

export default function initialConfig(): InitialConfig {
	return {
		graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
	};
}
