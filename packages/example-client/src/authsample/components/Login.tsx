import debug from 'debug';
import React from 'react';
import {TForm, TFormChildrenProps} from '@thx/controls';
import sha256 from '@thx/sha256';
import {Form, Input} from 'semantic-ui-react';
import {object as obj, string, InferType} from 'yup';
import {useLogin} from '@imperium/auth-client';
import Links from '../../core/Links';

const d = debug('app.AuthSample.Login');

const loginValidation = obj().shape({
	email: string().required('Email is required'),
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
				{({handleSubmit, values, handleChange}: TFormChildrenProps<LoginValidation>) => {
					return (
						<Form onSubmit={handleSubmit}>
							<Form.Field>
								<label>Email</label>
								<Input value={values.email} onChange={(ev, v) => handleChange('email')(v.value)} />
							</Form.Field>
							<Form.Field>
								<label>Password</label>
								<Input type="password" value={values.password} onChange={(ev, v) => handleChange('password')(v.value)} />
							</Form.Field>
							<Form.Button type="submit">Login</Form.Button>
						</Form>
					);
				}}
			</TForm>
			<Links/>
		</>
	);
}
