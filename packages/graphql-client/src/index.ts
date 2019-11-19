import {ImperiumClientModule} from '@imperium/client';
import withGraphql from './withGraphql';

export default function(): ImperiumClientModule {
	return {
		name: '@imperium/graphql-client',
		hocs: [withGraphql],
	};
}

export {ImperiumGraphqlClientModule} from './types';
