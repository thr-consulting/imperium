import gql from 'graphql-tag';
import debug from 'debug';
import React, {useState} from 'react';
import {Mutation} from 'react-apollo';
import {useFragments} from '@imperium/context';
import LogInForm from '../components/LogInForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Transit from '../components/Transit';
import {logInMutation, forgotPasswordMutation} from '../graphql';
import useAuth from '../context/useAuth';

const d = debug('imperium.auth.LogIn');

interface Props {
	restoreRoute: (routeKey: string) => void,
	routeKey: string,
}

export default function LogIn(props: Props) {
	const [view, setView] = useState('login');
	const authContext = useAuth();
	const fragments = useFragments();

	const {restoreRoute, routeKey} = props;

	if (!fragments || !fragments.userBasicInfoFragment) throw new Error('userBasicInfoFragment not defined in fragments context');
	const combinedLogInMutation = gql`${logInMutation} ${fragments.userBasicInfoFragment}`;

	const form = view === 'forgotpassword' ? (
		<Mutation mutation={forgotPasswordMutation}>
			{(forgotPassword, {loading, error}) => (
				<ForgotPasswordForm
					setView={setView}
					loading={loading}
					error={error}
					forgotPassword={email => {
						forgotPassword({variables: {email}}).then(ret => {
							d('Requested password reset success', ret);
							restoreRoute(routeKey);
						});
					}}
				/>
			)}
		</Mutation>
	) : (
		<Mutation mutation={combinedLogInMutation}>
			{(logIn, {loading, error}) => (
				<LogInForm
					setView={setView}
					loading={loading}
					error={error}
					logIn={(email, password) => {
						logIn({variables: {email, password}})
							.then(ret => {
								d('Login success, setting user');
								authContext.setUser({
									userId: ret.data.logIn.auth.userId,
									user: ret.data.logIn.auth.user,
									permissions: ret.data.logIn.auth.permissions,
									jwt: ret.data.logIn.jwt,
								});
								const {jwt_localstorage_name} = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle,camelcase,@typescript-eslint/camelcase
								window.localStorage.setItem(jwt_localstorage_name, ret.data.logIn.jwt);
								restoreRoute(routeKey);
							})
							.catch(err => {
								d(err.message);
							});
					}}
				/>
			)}
		</Mutation>
	);

	return (
		<Transit open restoreRoute={restoreRoute} routeKey={routeKey}>
			{form}
		</Transit>
	);
}
