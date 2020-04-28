import type {ServerModule} from './index';

export const todoSeverModule: ServerModule = {
	name: 'Todo',
	async startup(server, context) {
		// do whatever startup you need in here.
		// make sure you pass the correct context into your domain methods.

		// eslint-disable-next-line no-console
		console.log("running todo's server module startup method. Context:", context);
	},
};
