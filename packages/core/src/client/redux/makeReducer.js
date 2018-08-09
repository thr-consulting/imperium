import debug from 'debug';
import {combineReducers} from 'redux-immutablejs';

const d = debug('imperium.core.client.redux');

export default function(reducers) {
	d('Making reducer');
	return combineReducers({
		...reducers,
	});
}
