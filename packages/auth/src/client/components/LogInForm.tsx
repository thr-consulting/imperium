import React, {Dispatch, SetStateAction} from 'react';
import {Form, Input, Label} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import sha256 from './sha256';

const schema = object({
	password: TSchemas.password(),
	email: TSchemas.email(),
});

interface Props {
	setView: Dispatch<SetStateAction<string>>,
	loading: boolean,
	error: any,
	logIn: (email: string, payload: {digest: any, algorithm: string}) => void,
}

export default function LogInForm(props: Props) {
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
					<div style={{textAlign: 'center'}}>
						<Label style={{marginBottom: '1.5em'}} basic size="tiny" color="grey" as="a" onClick={() => setView('forgotpassword')}>Forgot your password?</Label>
					</div>
					<Form.Button primary type="submit" size="medium" loading={loading} disabled={loading} color="green" fluid>Sign In</Form.Button>
				</Form>
			)}
		/>
	);
}
