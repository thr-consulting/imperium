import debug from 'debug';
import React, {useState} from 'react';
// import {Mutation} from 'react-apollo';
// import get from 'lodash/get';
// import {Grid, TransitionablePortal, Segment} from 'semantic-ui-react';
// import StandardContent from '../../core/client/components/StandardContent';
import LogInForm from '../components/LogInForm';
// import sha256 from '../../lib/sha256';
// import {signInSuccess, signInError} from '../data/redux';
// import {signInMutation} from '../data/graphql';
import Transit from '../components/Transit';

const d = debug('imperium:auth:SignIn');

export default function SignIn(props) {
	const [open, setOpen] = useState(true)

	const {restoreRoute, routeKey} = props;

	return (
		<Transit open={open} restoreRoute={restoreRoute} routeKey={routeKey}>
			<LogInForm
				setOpen={setOpen}
			/>
		</Transit>
	);
}

/*
type Props = {
	signInSuccess: (jwt: String) => void,
	signInError: (error: String) => void,
	history: any,
	location: any,
};

class SignIn extends Component<Props> {
	handleSignIn = signIn => (email, password) => {
		// Immediately hash password so we're not passing around plain text
		const payload = {
			email,
			password: {
				digest: sha256(password),
				algorithm: 'sha-256',
			},
		};

		d('Calling signIn mutation', payload);
		signIn({variables: payload})
			.then(ret => this.props.signInSuccess(ret.data.signIn))
			.then(() => {
				const dest = get(this.props.location, 'state.from.pathname', '/');
				this.props.history.push(dest);
			})
			.catch(() => {});
	};

	props: Props;

	renderSignIn = (signIn, {loading, error}) => (
		<StandardContent title="Sign In">
			<Grid.Row>
				<Grid.Column>
					<SignInForm signIn={this.handleSignIn(signIn)} error={error} loading={loading}/>
				</Grid.Column>
			</Grid.Row>
		</StandardContent>
	);

	render() {
		return (
			<Mutation mutation={signInMutation} children={this.renderSignIn}/>
		);
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	signInSuccess,
	signInError,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
*/
