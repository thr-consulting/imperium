import {type ApolloClientOptions, ApolloProvider, type NormalizedCacheObject} from '@apollo/client';
import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import {type ComponentType, useMemo, useState} from 'react';
import {ImperiumGraphqlContext} from './ImperiumGraphqlContext';
import {createApolloClient, type ImpApolloClient} from './createApolloClient';

const d = debug('imperium.graphql-client.withGraphql');

export interface GraphqlClientOptions<TCacheShape = NormalizedCacheObject> {
	removeTypenameOnInput?: boolean;
	apolloClientOptions: Partial<ApolloClientOptions<TCacheShape>>;
	batchMax?: number;
	batchInterval?: number;
}

export function withGraphql(opts?: GraphqlClientOptions) {
	return (client: ImperiumClient): Hoc => {
		d('Creating initial Apollo client');
		const initialClient = createApolloClient({opts, client});

		return function graphqlHoc(WrappedComponent: ComponentType) {
			const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

			function ComponentWithGraphql(props: any) {
				const [apolloClient, setApolloClient] = useState<ImpApolloClient>(initialClient);
				const recon = useMemo(() => {
					return {
						reconnect() {
							const newApolloClient = createApolloClient({client, opts, apolloClient});
							setApolloClient(newApolloClient);
						},
					};
				}, [apolloClient]);

				return (
					<ImperiumGraphqlContext.Provider value={recon}>
						<ApolloProvider client={apolloClient.client}>
							<WrappedComponent {...props} />
						</ApolloProvider>
					</ImperiumGraphqlContext.Provider>
				);
			}

			ComponentWithGraphql.displayName = `withGraphql(${displayName})`;

			return ComponentWithGraphql;
		};
	};
}
