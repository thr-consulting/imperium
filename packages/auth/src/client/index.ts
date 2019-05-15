import routes from './routes';
import pre from './pre';

export {default as AuthContextProvider} from './context/AuthContextProvider';
export {default as AuthContextConsumer} from './context/AuthContextConsumer';
export {default as useAuth} from './context/useAuth';

function startup(initialConf, {auth}) {
	return {
		auth,
	};
}

export default function ImperiumAuthModule() {
	return {
		startup,
		routes,
		pre,
	};
}
