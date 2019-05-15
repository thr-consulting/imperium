import {InitialState} from '@imperium/core';
import checkTokens from './checkTokens';
import apolloLinks from './apolloLinks';

export default async function pre(initialConf, initialState): Promise<InitialState> {
	return {
		...await apolloLinks(initialConf, initialState),
		...await checkTokens(initialConf),
	};
}
