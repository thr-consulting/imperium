import type {Hoc, ImperiumClient} from '@imperium/client';
import {configureStore, getDefaultMiddleware, Middleware} from '@reduxjs/toolkit';
import debug from 'debug';
import React, {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {ActionSerializers, isImperiumStateClientModule, StateClientOptions} from './types';
import {createSerializerMiddleware} from './createSerializerMiddleware';

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

		const actionSerializers = client.modules.reduce<ActionSerializers>((moduleMemo, module) => {
			if (isImperiumStateClientModule(module)) {
				if (!module.state || !module.state.serializer || !module.state.serializer.actions) return moduleMemo;
				const sliceSerializerActions = module.state.serializer.actions;
				const moduleName = module.state.name;
				const serializerActions = Object.keys(sliceSerializerActions).reduce<ActionSerializers>((sliceMemo, v) => {
					const actionName = `${moduleName}/${v}`;
					return {
						[actionName]: sliceSerializerActions[v],
					};
				}, {});

				return {
					...moduleMemo,
					...serializerActions,
				};
			}
			return moduleMemo;
		}, {});

		const middleware = [createSerializerMiddleware(actionSerializers), ...getDefaultMiddleware(), ...(opts?.middleware || [])];

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
