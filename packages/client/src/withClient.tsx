// HoC that injects Imperium client as a prop
import React from 'react';
import {ClientContext} from './ClientContext';
import type {ImperiumClient} from './ImperiumClient';
import type {Hoc} from './types';

export function withClient(client: ImperiumClient): Hoc {
	return function clientHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
		function ComponentWithClient(props: any) {
			return (
				<ClientContext.Provider value={client}>
					<WrappedComponent {...props} />
				</ClientContext.Provider>
			);
		}
		ComponentWithClient.displayName = `withClient(${displayName}`;
		return ComponentWithClient;
	};
}
