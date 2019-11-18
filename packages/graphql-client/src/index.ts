import {ImperiumClientModule} from '@imperium/client';
import {name} from '../package.json';
import withGraphql from './withGraphql';

export default function(): ImperiumClientModule {
	return {
		name,
		hocs: [withGraphql],
	};
}
