import React from 'react';
import {Form, Input} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import debug from 'debug';

const d = debug('imperium.auth.LogInForm');

const schema = object({
	password: TSchemas.password(),
	email: TSchemas.email(),
});

export default function LogInForm(props) {
	const {setOpen, setView, loading, error} = props;

	return (
		<TForm
			initialValues={{password: '', email: ''}}
			validationSchema={schema}
			onSubmit={({email, password}) => {
				d(email, password);
				setOpen(false);
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
					<p style={{fontSize: '0.8em', textAlign: 'center'}}>
						<button type="button" onClick={() => setView('forgotpassword')}>Forgot your password?</button>
					</p>
					<Form.Button primary type="submit" size="medium" loading={loading} disabled={loading} color="green" fluid>Sign In</Form.Button>
				</Form>
			)}
		/>
	);
}
