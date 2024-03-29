import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import debug from 'debug';
import type {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {isImperiumStateClientModule, StateClientOptions} from './types';

const d = debug('imperium.state.withImperiumState');

export function withImperiumState(opts?: StateClientOptions) {
	return (client: ImperiumClient): Hoc => {
		const reducer = client.modules.reduce((memo, module) => {
			if (isImperiumStateClientModule(module)) {
				if (!module.state?.name) return memo;
				return {
					...memo,
					[module.state.name]: module.state?.reducer,
				};
			}
			return memo;
		}, {});

		const middleware = [...getDefaultMiddleware(), ...(opts?.middleware || [])];

		const store =
			Object.keys(reducer).length > 0
				? configureStore({
						reducer,
						middleware,
				  })
				: null;
		if (store) {
			d('Redux store created');
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
