import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, type Middleware, type ReducersMapObject, type Slice} from '@reduxjs/toolkit';
import debug from 'debug';
import type {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {loadPersistedState, type PersistedSlice} from './createStateSlice';
import {isImperiumStateClientModule, type StateClientOptions} from './types';

const d = debug('imperium.state.withImperiumState');

type RootState = Record<string, unknown>;

function getReducer(prev: ReducersMapObject<RootState>, slice: Slice): ReducersMapObject<RootState> {
	if (!slice.name) return prev;

	// eslint-disable-next-line no-param-reassign
	prev[slice.name] = slice.reducer;

	return prev;
}

export function withImperiumState(opts?: StateClientOptions) {
	return (client: ImperiumClient): Hoc => {
		const persistedSlices = new Map<string, PersistedSlice<unknown>>();

		const reducer = client.modules.reduce<ReducersMapObject<RootState>>((memo, module) => {
			if (!isImperiumStateClientModule(module) || !module.state) {
				return memo;
			}

			const slices = Array.isArray(module.state) ? module.state : [module.state];

			slices.forEach(slice => {
				const persistedSlice = slice as PersistedSlice<unknown>;

				if (persistedSlice.persist && persistedSlice.name) {
					persistedSlices.set(persistedSlice.name, persistedSlice);
				}
			});

			return slices.reduce((m, slice) => getReducer(m, slice), memo);
		}, {});

		const preloadedState: RootState = {};

		persistedSlices.forEach(slice => {
			preloadedState[slice.name] = loadPersistedState(slice.name, slice.getInitialState());
		});

		const store =
			Object.keys(reducer).length > 0
				? configureStore({
						reducer,
						preloadedState,
						middleware: getDefaultMiddleware => getDefaultMiddleware().concat(opts?.middleware as Middleware[]),
					})
				: null;

		if (store) {
			d('Redux store created');

			if (persistedSlices.size > 0 && typeof window !== 'undefined') {
				const previousState: RootState = {};
				const initialState = store.getState() as RootState;

				// Prevent immediate redundant writes after hydration
				persistedSlices.forEach(slice => {
					previousState[slice.name] = initialState[slice.name];
				});

				store.subscribe(() => {
					if (typeof window === 'undefined') {
						return;
					}

					const currentRootState = store.getState() as RootState;

					persistedSlices.forEach(slice => {
						const nextState = currentRootState[slice.name];

						// Skip unchanged references
						if (previousState[slice.name] === nextState) {
							return;
						}

						previousState[slice.name] = nextState;

						try {
							localStorage.setItem(`persisted_slice_${slice.name}`, JSON.stringify(nextState));
						} catch (err) {
							d(`Failed to persist slice state for ${slice.name}:`, err);
						}
					});
				});
			}
		} else {
			d('No reducers found, Redux store not created');
		}

		return function imperiumStateHoc<Props extends object>(Wrapped: ComponentType<Props>) {
			const displayName = Wrapped.displayName || Wrapped.name || 'Component';

			function WithImperiumState(props: Props) {
				if (!store) {
					return <Wrapped {...props} />;
				}

				return (
					<Provider store={store}>
						<Wrapped {...props} />
					</Provider>
				);
			}

			WithImperiumState.displayName = `withImperiumState(${displayName})`;

			return WithImperiumState;
		};
	};
}
