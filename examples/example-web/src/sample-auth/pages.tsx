import {useCan} from '@imperium/auth-client';
import {createPages} from '@imperium/layout';
import ComponentUsingAuth from './components/ComponentUsingAuth';
import Login from './components/Login';
import {routes} from './routes';

export const routeProps = createPages(routes, {
	login: {
		content: () => <Login />,
	},
	authTest: {
		permissionSelectorHook: () => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [getStuff] = useCan({permission: 'getStuff', data: {values: 'stuff'}});
			return {getStuff};
		},
		content: () => {
			return <ComponentUsingAuth />;
		},
	},
});
