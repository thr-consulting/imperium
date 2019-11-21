import Users from './pages/Users';
import User from './pages/User';
import Todos from './pages/Todos';

export default function TodoClientModule() {
	return {
		name: 'Todo',
		routes: [
			{path: '/user', content: Users, exact: true},
			{path: '/user/:id', content: User, exact: true},
			{path: '/todo', content: Todos},
		],
	};
}
