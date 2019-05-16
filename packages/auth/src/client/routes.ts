import Login from './containers/Login';
import Logout from './containers/Logout';
import SignUp from './containers/SignUp';

export default [
	{
		key: 'login',
		portal: Login,
	},
	{
		key: 'signup',
		portal: SignUp,
	},
	{
		key: 'logout',
		portal: Logout,
	},
];
