import React from 'react';
import debug from 'debug';
import {Form} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import {TForm} from '@thx/controls';
import {object} from 'yup';
import styles from './styles.css';

const d = debug('imperium.auth.SignUpForm');

const schema = object({
	email: TSchemas.email(),
});

interface Props {
	signUp: (email: string) => void,
	loading: boolean,
	error: any,
}

export default function SignUpForm(props: Props) {
	const {loading, error, signUp} = props;

	return (
		<TForm
			initialValues={{email: ''}}
			validationSchema={schema}
			onSubmit={({email}) => {
				signUp(email);
			}}
			errors={error}
			loading={loading}
			numFields={1}
			render={({values, handleChange, handleBlur, handleSubmit, renderErrors, renderWarnings, hasErrors, hasWarnings, fieldError}) => (
				<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
					{renderErrors()}
					{renderWarnings()}
					<p className={styles.smallText}>
						We&apos;ll send a confirmation email to finish setting up your account.
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
					<Form.Button primary type="submit" size="medium" loading={loading} disabled={loading} color="green" fluid>Sign Up</Form.Button>
				</Form>
			)}
		/>
	);
}
