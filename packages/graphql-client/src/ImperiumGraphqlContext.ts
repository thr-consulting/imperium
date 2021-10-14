import React from 'react';
// import type {ApolloClient} from '@apollo/client';

export interface IImperiumGraphqlContext {
	// apolloClient: ApolloClient<TCacheShape> | null;
	// setApolloClient: (apolloClient: ApolloClient<TCacheShape> | null) => void;
	// getApolloClient: ApolloClient<TCacheShape> | null;
	reconnect: () => void;
}

const defaultGraphqlContext = {
	// apolloClient: null,
	// setApolloClient() {},
	// getApolloClient() {},
	reconnect() {},
};

export const ImperiumGraphqlContext = React.createContext(defaultGraphqlContext);
