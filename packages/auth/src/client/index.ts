export {default as AuthContextProvider} from './context/AuthContextProvider';
export {default as AuthContextConsumer} from './context/AuthContextConsumer';
export {default as useAuth} from './context/useAuth';
export {default as routes} from './routes';

export function startup(initialConf, {auth}) {
	return {
		auth,
	};
}
