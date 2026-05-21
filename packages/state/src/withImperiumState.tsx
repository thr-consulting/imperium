import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, type Slice} from '@reduxjs/toolkit';
import debug from 'debug';
import type {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {isImperiumStateClientModule, type StateClientOptions} from './types';

const d = debug('imperium.state.withImperiumState');

// Helper to safely read and parse JSON cookies on initialization
function getCookie(name: string) {
	if (typeof window === 'undefined') return undefined;
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
	if (match) {
		try {
			return JSON.parse(decodeURIComponent(match[2]));
		} catch {
			return undefined;
		}
	}
	return undefined;
}

function getReducer(prev: object, state: Slice) {
	if (!state.name) return prev;
	return {
		...prev,
		[state.name]: state.reducer,
	};
}

export function withImperiumState(opts?: StateClientOptions) {
	return (client: ImperiumClient): Hoc => {
		// 1. Track the names of slices that have custom persistence metadata
		const persistedKeys: string[] = [];

		const reducer = client.modules.reduce((memo, module) => {
			if (isImperiumStateClientModule(module)) {
				if (!module.state) return memo;

				const processSlice = (slice: any, currentMemo: object) => {
					if (!slice?.name) return currentMemo;

					// Duck-type verification: Check if the app-space flag is present
					if (slice.p === true || slice.persist === true) {
						persistedKeys.push(slice.name);
					}
					return getReducer(currentMemo, slice);
				};

				if (Array.isArray(module.state)) {
					return module.state.reduce((m, slice) => processSlice(slice, m), memo);
				}
				return processSlice(module.state, memo);
			}
			return memo;
		}, {});

		// 2. Rehydrate the initial store state from any existing cookies
		const preloadedState: Record<string, any> = {};
		persistedKeys.forEach(key => {
			const saved = getCookie(`redux_${key}`);
			if (saved !== undefined) {
				preloadedState[key] = saved;
			}
		});

		// 3. Define the runtime persistence middleware inside Imperium
		const cookieMiddleware = (store: any) => (next: any) => (action: any) => {
			const result = next(action);
			const nextState = store.getState();

			persistedKeys.forEach(key => {
				if (nextState[key] !== undefined && typeof window !== 'undefined') {
					try {
						const serialized = JSON.stringify(nextState[key]);
						document.cookie = `redux_${key}=${encodeURIComponent(serialized)}; path=/; max-age=31536000; SameSite=Strict`;
					} catch (err) {
						// eslint-disable-next-line no-console
						console.error(`[Imperium State] Failed to write cookie for ${key}:`, err);
					}
				}
			});

			return result;
		};

		// 4. Instantiate the final Redux store with rehydration and our sync middleware
		const store =
			Object.keys(reducer).length > 0
				? configureStore({
						reducer,
						preloadedState, // Injects cookie values back on load
						middleware: getDefaultMiddleware =>
							getDefaultMiddleware()
								.concat(cookieMiddleware) // Handles writing state updates back to cookies
								.concat(opts?.middleware || []),
					})
				: null;

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
