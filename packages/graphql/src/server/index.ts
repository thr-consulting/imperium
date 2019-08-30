import {name} from '../../package.json';
// import endpoints from './endpoints';

export default function() {
	return {
		name,
		// endpoints,
		middleware: () => ({
			mymiddleware: () => {},
		}),
		endpoints: () => {

		},
	};
}
