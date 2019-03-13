import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Transit from '../components/Transit';

export default function ForgotPassword(props) {
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

ForgotPassword.propTypes = {
	restoreRoute: PropTypes.func.isRequired,
	routeKey: PropTypes.string.isRequired,
};
