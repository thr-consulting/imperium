import {Authorization} from '@imperium/authorization';
import React from 'react';
import type {ClientAuthorizationData, IAuth} from './types';

export interface IAuthContext {
	authorization: Authorization<ClientAuthorizationData>;
	setAuthenticated: (authenticated: IAuth) => void;
}

const defaultAuthContext: IAuthContext = {
	authorization: new Authorization<ClientAuthorizationData>(),
	setAuthenticated: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);
