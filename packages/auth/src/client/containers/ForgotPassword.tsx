import React, {useState} from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Transit from '../components/Transit';

interface Props {
	restoreRoute: (routeKey: string) => void,
	routeKey: string,
}

export default function ForgotPassword(props: Props): JSX.Element {
	const [open, setOpen] = useState(true);

	const {restoreRoute, routeKey} = props;

	return (
		<Transit open={open} restoreRoute={restoreRoute} routeKey={routeKey}>
			<ForgotPasswordForm
				setOpen={setOpen}
			/>
		</Transit>
	);
}
