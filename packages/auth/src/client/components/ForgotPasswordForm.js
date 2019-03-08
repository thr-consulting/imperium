import React from 'react';
import {Form, Icon} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import styles from './styles.css';

const schema = object({
	email: TSchemas.email(),
});

export default function ForgotPasswordForm(props) {
	const {setOpen, setView, loading, error} = props;

	return (
		<TForm
			initialValues={{email: ''}}
			validationSchema={schema}
			onSubmit={({email}) => {
				setOpen(false);
			}}
			errors={error}
			loading={loading}
			numFields={1}
			render={({values, handleChange, handleBlur, handleSubmit, renderErrors, renderWarnings, hasErrors, hasWarnings, fieldError}) => (
				<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
					<div className={styles.chevron}>
						<Icon name="angle left" link size="huge" onClick={() => setView('login')} style={{width: 40}}/>
					</div>
					{renderErrors()}
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
