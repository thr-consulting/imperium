import {createContext} from 'react';

export interface IImperiumGraphqlContext {
	reconnect: () => void;
}

const defaultGraphqlContext = {
	reconnect() {},
};

export const ImperiumGraphqlContext = createContext(defaultGraphqlContext);
