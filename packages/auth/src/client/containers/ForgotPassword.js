import debug from 'debug';
import React, {useState} from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Transit from '../components/Transit';

// const d = debug('imperium:auth:ForgotPassword');

export default function ForgotPassword(props) {
	const [open, setOpen] = useState(true)

	const {restoreRoute, routeKey} = props;

	return (
		<Transit open={open} restoreRoute={restoreRoute} routeKey={routeKey}>
			<ForgotPasswordForm
				setOpen={setOpen}
			/>
		</Transit>
	);
}
