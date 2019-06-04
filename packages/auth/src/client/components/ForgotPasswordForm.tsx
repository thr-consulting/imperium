import React, {SetStateAction, Dispatch} from 'react';
import debug from 'debug';
import {Form, Icon} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import styles from './styles.css';

const d = debug('imperium.auth.ForgotPasswordForm');

const schema = object({
	email: TSchemas.email(),
});

interface Props {
	forgotPassword: (email: string) => void,
	setView: Dispatch<SetStateAction<string>>,
	loading: boolean,
	error: any,
}

export default function ForgotPasswordForm(props: Props) {
	const {setView, loading, error, forgotPassword} = props;

	return (
		<TForm
			initialValues={{email: ''}}
			validationSchema={schema}
			onSubmit={({email}) => {
				forgotPassword(email);
			}}
			errors={error}
			loading={loading}
			render={({values, handleChange, handleBlur, handleSubmit, renderWarnings, hasErrors, hasWarnings, fieldError}) => (
				<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
					<div className={styles.chevron}>
						<Icon name="angle left" link size="huge" onClick={() => setView('login')} style={{width: 40}}/>
					</div>
					{renderWarnings()}
					<p className={styles.smallText}>
						We&apos;ll send a password reset link to your account&apos;s email address.
					</p>
					<Form.Field required error={fieldError('email')}>
						<label>Email</label>
						<input
							placeholder="Email"
							name="email"
							type="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Field>
					<Form.Button primary type="submit" size="medium" loading={loading} disabled={loading} color="green" fluid>Reset Password</Form.Button>
				</Form>
			)}
		/>
	);
}
