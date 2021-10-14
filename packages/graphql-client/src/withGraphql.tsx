import {ApolloClientOptions, ApolloProvider, NormalizedCacheObject} from '@apollo/client';
import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import React, {useState} from 'react';
import {ImperiumGraphqlContext} from './ImperiumGraphqlContext';
import {createApolloClient, ImpApolloClient} from './createApolloClient';

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

		return function graphqlHoc(WrappedComponent: React.ComponentType) {
			const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

			function ComponentWithGraphql(props: any) {
				const [apolloClient, setApolloClient] = useState<ImpApolloClient>(initialClient);

				return (
					<ImperiumGraphqlContext.Provider
						value={{
							reconnect() {
								const newApolloClient = createApolloClient({client, opts, apolloClient});
								setApolloClient(newApolloClient);
							},
						}}
					>
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
