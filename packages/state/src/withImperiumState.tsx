import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, Slice} from '@reduxjs/toolkit';
import debug from 'debug';
import type {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {isImperiumStateClientModule, StateClientOptions} from './types';

const d = debug('imperium.state.withImperiumState');

function getReducer(prev: object, state: Slice) {
	if (!state?.name) return prev;
	return {
		...prev,
		[state.name]: state.reducer,
	};
}

export function withImperiumState(opts?: StateClientOptions) {
	return (client: ImperiumClient): Hoc => {
		const reducer = client.modules.reduce((memo, module) => {
			if (isImperiumStateClientModule(module)) {
				if (!module.state) return memo;
				if (Array.isArray(module.state)) {
					return module.state.reduce((m, slice) => {
						return getReducer(m, slice);
					}, memo);
				}
				return getReducer(memo, module.state);
			}
			return memo;
		}, {});

		const store =
			Object.keys(reducer).length > 0
				? configureStore({
						reducer,
						middleware: getDefaultMiddleware => getDefaultMiddleware().concat(opts?.middleware || []),
				  })
				: null;
		if (store) {
			d('Redux store created');
			// TODO client.setRegistry('@imperium/state/store', store);
		} else {
			d('No reducers found, Redux store not created');
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function imperiumStateHoc(Wrapped: ComponentType<any>) {
			const displayName = Wrapped.displayName || Wrapped.name || '';

			function WithImperiumState(props: unknown) {
				if (store) {
					return (
						<Provider store={store}>
							<Wrapped {...props} />
						</Provider>
					);
				}
				return <Wrapped {...props} />;
			}

			WithImperiumState.displayName = `withImperiumState(${displayName})`;

			return WithImperiumState;
		};
	};
}
