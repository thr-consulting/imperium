import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, type Slice} from '@reduxjs/toolkit';
import debug from 'debug';
import type {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {isImperiumStateClientModule, type StateClientOptions} from './types';
import {loadPersistedState, type PersistedSlice} from './createStateSlice'; // Keep your helper imports

const d = debug('imperium.state.withImperiumState');

function getReducer(prev: object, state: Slice) {
	if (!state.name) return prev;
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

		// Build the store without preloadedState to guarantee pristine initial states
		const store =
			Object.keys(reducer).length > 0
				? configureStore({
						reducer,
						middleware: getDefaultMiddleware => getDefaultMiddleware().concat(opts?.middleware || []),
					})
				: null;

		if (store) {
			d('Redux store created');

			// Collect slices that explicitly want persistence out of the modules
			const persistedSlices: PersistedSlice<unknown>[] = [];
			client.modules.forEach(module => {
				if (isImperiumStateClientModule(module) && module.state) {
					const slices = Array.isArray(module.state) ? module.state : [module.state];
					slices.forEach(slice => {
						const persistedSlice = slice as PersistedSlice<unknown>;
						if (persistedSlice.persist && persistedSlice.name) {
							persistedSlices.push(persistedSlice);
						}
					});
				}
			});

			// Safely hydrate those flagged slices via standard dynamic actions
			if (persistedSlices.length > 0 && typeof window !== 'undefined') {
				persistedSlices.forEach(slice => {
					const savedState = loadPersistedState(slice.name, store.getState()[slice.name]);

					// Dispatch to the store directly so it travels through standard Redux architecture
					store.dispatch({
						type: `${slice.name}/hydrate`, // If using custom reducers, or map to a generic hydrator
						payload: savedState,
					});
				});

				// Keep previous state reference map isolated for writing
				const previousState: Record<string, unknown> = {};
				const initialState = store.getState() as Record<string, unknown>;

				persistedSlices.forEach(slice => {
					previousState[slice.name] = initialState[slice.name];
				});

				store.subscribe(() => {
					if (typeof window === 'undefined') return;

					const currentRootState = store.getState() as Record<string, unknown>;

					persistedSlices.forEach(slice => {
						const nextState = currentRootState[slice.name];

						if (previousState[slice.name] === nextState) return;

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

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function imperiumStateHoc(Wrapped: ComponentType<any>) {
			const displayName = Wrapped.displayName || Wrapped.name || '';

			function WithImperiumState(props: Record<string, unknown>) {
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
