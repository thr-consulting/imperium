import React, {Component} from 'react';
import debug from 'debug';
import {Link} from 'react-router-dom';
import {object} from 'yup';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {Segment, Form} from 'semantic-ui-react';
import styles from './styles.css';

const d = debug('imperium.auth.client.SignInForm');

const schema = object({
	password: TSchemas.password(),
	email: TSchemas.email(),
});

type SignInInfo = {
	email: string,
	password: string,
};

type Props = {
	signIn: (email: String, password: String) => void,
	error: any,
	loading: boolean,
};

export default class SignInForm extends Component<Props> {
	handleSubmit = ({email, password}: SignInInfo) => {
		d(email, password);
		this.props.signIn(email, password);
	};

	props: Props;

	renderForm = ({values, handleChange, handleBlur, handleSubmit, renderErrors, renderWarnings, hasErrors, hasWarnings, fieldError}) => (
		<Segment stacked>
			<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
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
				<Form.Field required error={fieldError('password')}>
					<label>Password</label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Field>
				<Form.Button primary size="large" loading={this.props.loading} disabled={this.props.loading}>Sign In</Form.Button>
				<p className={styles.links}>
					<Link to="/user/forgot-password">Forgot your password?</Link>
				</p>
				{renderErrors()}
				{renderWarnings()}
			</Form>
		</Segment>
	);

	render() {
		return (
			<TForm
				initialValues={{password: '', email: ''}}
				validationSchema={schema}
				onSubmit={this.handleSubmit}
				render={this.renderForm}
				errors={this.props.error}
				loading={this.props.loading}
				numFields={2}
			/>
		);
	}
}
