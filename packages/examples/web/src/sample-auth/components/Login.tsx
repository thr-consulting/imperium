import {useLogin} from '@imperium/auth-client';
import {TForm, TFormProps} from '@thx/controls';
import sha256 from '@thx/sha256';
import debug from 'debug';
import React from 'react';
import {Form, Input, Segment} from 'semantic-ui-react';
import {object as obj, string, InferType} from 'yup';

const d = debug('imperium.examples.examples/web.sample-auth.components.Login');

const loginValidation = obj().shape({
	email: string().email('Must be a valid email address').required('Email is required'),
	password: string().required('Password is required'),
});

type LoginValidation = InferType<typeof loginValidation>;

export default function Login() {
	const login = useLogin();

	return (
		<>
			<h1>Login</h1>
			<TForm<LoginValidation>
				initialValues={{email: '', password: ''}}
				onSubmit={v => {
					login({
						identifier: v.email,
						password: {
							digest: sha256(v.password),
							algorithm: 'sha-256',
						},
					})
						.then(() => {
							d('Logged in successfully');
						})
						.catch(err => {
							d('Login error', err);
						});
				}}
				validationSchema={loginValidation}
			>
				{({handleSubmit, values, handleChange}: TFormProps<LoginValidation>) => {
					return (
						<Form onSubmit={handleSubmit} inverted>
							<Form.Field>
								<label>Email</label>
								<Input value={values.email} onChange={(ev, v) => handleChange('email')(v.value)} />
							</Form.Field>
							<Form.Field>
								<label>Password</label>
								<Input
									autoComplete="current-password"
									type="password"
									value={values.password}
									onChange={(ev, v) => handleChange('password')(v.value)}
								/>
							</Form.Field>
							<Form.Button type="submit">Login</Form.Button>
							<Segment inverted>
								<p>Use one of the following to login:</p>
								<ul>
									<li>
										Username: <code>john@example.com</code> Password: <code>password</code>
									</li>
									<li>
										Username: <code>jane@example.com</code> Password: <code>password</code>
									</li>
								</ul>
							</Segment>
						</Form>
					);
				}}
			</TForm>
		</>
	);
}
