import debug from 'debug';
import {ImperiumServerModule} from '@imperium/server';
import {ImperiumTypeormServerModule} from '@imperium/typeorm';
import {Score} from './Score';

const d = debug('app.mytypeorm.server');

export default function MyTypeorm(): ImperiumServerModule & ImperiumTypeormServerModule {
	return {
		name: 'Todo',
		async startup() {
			d('hello');
		},
		entities() {
			return [Score];
		},
	};
}
