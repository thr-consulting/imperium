import debug from 'debug';
import React from 'react';
import {Mutation} from 'react-apollo';
import Transit from '../components/Transit';
import {signUpMutation} from '../graphql';
import SignUpForm from '../components/SignUpForm';

const d = debug('imperium.auth.SignUp');

interface Props {
	restoreRoute: (routeKey: string) => void,
	routeKey: string,
}

export default function SignUp(props: Props) {
	const {restoreRoute, routeKey} = props;

	return (
		<Transit open restoreRoute={restoreRoute} routeKey={routeKey}>
			<Mutation mutation={signUpMutation}>
				{(signUp, {loading, error}) => (
					<SignUpForm
						loading={loading}
						error={error}
						signUp={email => {
							signUp({variables: {email}});
						}}
						// logIn={(email, password) => {
						// 	logIn({variables: {email, password}})
						// 		.then(ret => {
						// 			d('Login success, setting user');
						// 			authContext.setUser({
						// 				userId: ret.data.logIn.auth.userId,
						// 				user: ret.data.logIn.auth.user,
						// 				permissions: ret.data.logIn.auth.permissions,
						// 				jwt: ret.data.logIn.jwt,
						// 			});
						// 			const {jwt_localstorage_name} = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle,camelcase,@typescript-eslint/camelcase
						// 			window.localStorage.setItem(jwt_localstorage_name, ret.data.logIn.jwt);
						// 			restoreRoute(routeKey);
						// 		})
						// 		.catch(err => {
						// 			d(err.message);
						// 		});
						// }}
					/>
				)}
			</Mutation>
		</Transit>
	);
}
