import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import styles from './styles.css';
import sha256 from './sha256';

const schema = object({
	password: TSchemas.password(),
	email: TSchemas.email(),
});

export default function LogInForm(props) {
	const {setView, loading, error, logIn} = props;

	return (
		<TForm
			initialValues={{password: '', email: ''}}
			validationSchema={schema}
			onSubmit={({email, password}) => {
				const payload = {
					digest: sha256(password),
					algorithm: 'sha-256',
				};
				logIn(email, payload);
			}}
			errors={error}
			loading={loading}
			numFields={2}
			render={({values, handleChange, handleBlur, handleSubmit, renderErrors, renderWarnings, hasErrors, hasWarnings, fieldError}) => (
				<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
					{renderErrors()}
					{renderWarnings()}
					<Form.Field required error={fieldError('email')}>
						<label>Email</label>
						<Input
							placeholder="Email"
							name="email"
							type="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Field>
					<Form.Field required error={fieldError('password')}>
						<label>Password</label>
						<Input
							name="password"
							type="password"
							placeholder="Password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Field>
					<p className={styles.smallText}>
						<button type="button" onClick={() => setView('forgotpassword')}>Forgot your password?</button>
					</p>
					<Form.Button primary type="submit" size="medium" loading={loading} disabled={loading} color="green" fluid>Sign In</Form.Button>
				</Form>
			)}
		/>
	);
}

LogInForm.propTypes = {
	setView: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	error: PropTypes.any, // eslint-disable-line
	logIn: PropTypes.func.isRequired,
};
