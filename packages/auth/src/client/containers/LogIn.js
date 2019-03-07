import debug from 'debug';
import React, {useState} from 'react';
import LogInForm from '../components/LogInForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Transit from '../components/Transit';

const d = debug('imperium:auth:LogIn');

export default function SignIn(props) {
	const [open, setOpen] = useState(true);
	const [view, setView] = useState('login');

	const {restoreRoute, routeKey} = props;

	const form = view === 'forgotpassword' ? (
		<ForgotPasswordForm
			setOpen={setOpen}
			setView={setView}
		/>
	) : (
		<LogInForm
			setOpen={setOpen}
			setView={setView}
		/>
	);

	return (
		<Transit open={open} restoreRoute={restoreRoute} routeKey={routeKey}>
			{form}
		</Transit>
	);
}
