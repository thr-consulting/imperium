import {name} from '../../package.json';
import withGraphql from './withGraphql';

export default function() {
	return {
		name,
		hocs: [withGraphql],
	};
}
