import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import React, {ComponentType} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {isImperiumStateClientModule} from './types';

const d = debug('imperium.state.withImperiumState');

export function withImperiumState(client: ImperiumClient): Hoc {
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

	const store = Object.keys(reducer).length > 0 ? configureStore({reducer}) : null;
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
}
