import debug from 'debug';
import type {Middleware} from '@reduxjs/toolkit';
import type {ActionSerializers} from './types';

const d = debug('imperium.state.createSerializerMiddleware');

export function createSerializerMiddleware(serializerActions: ActionSerializers): Middleware {
	return () => next => (action: any) => {
		if (action.type && typeof action.type === 'string') {
			if (serializerActions[action.type]) {
				const payload = serializerActions[action.type](action);
				d('Serialized action payload', action, payload);
				return next({...action, payload});
			}
		}
		return next(action);
	};
}
