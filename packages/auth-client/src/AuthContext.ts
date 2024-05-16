import {type AuthenticationToken, Authorization} from '@imperium/authorization';
import {createContext} from 'react';

export interface IAuthContext {
	authorization: Authorization<AuthenticationToken>;
}

const defaultAuthContext: IAuthContext = {
	authorization: new Authorization<AuthenticationToken>(),
};

export const AuthContext = createContext(defaultAuthContext);
