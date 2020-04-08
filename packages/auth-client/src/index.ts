import 'whatwg-fetch';
import {ImperiumClientModule} from '@imperium/client';
import {withAuth} from './withAuth';

export default function (): ImperiumClientModule {
	return {
		name: '@imperium/auth-client',
		hocs: [withAuth],
	};
}

export {useAuth} from './useAuth';
export {useForgetPassword} from './useForgetPassword';
export {useLogin} from './useLogin';
export {useLogout} from './useLogout';
export {ImperiumAuthClientModule, LoginInfo, LoginReturn, AccessToken} from './types';
