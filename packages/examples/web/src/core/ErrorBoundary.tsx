import debug from 'debug';
import React, {ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Header, Segment} from 'semantic-ui-react';

const d = debug('imperium.examples.examples/web.core.ErrorBoundary');

interface ErrorBoundaryProps extends RouteComponentProps {
	children: ReactNode;
}
interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

const errorBoundarySegmentStyle = {
	margin: '1em',
};

export class ErrorBoundaryComponent extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>, prevState: Readonly<ErrorBoundaryState>) {
		// Reset error state if route has changed
		if (prevState.hasError && this.state.hasError && prevProps.location.key !== this.props.location.key) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({hasError: false});
		}
	}

	componentDidCatch(error: Error) {
		this.setState({error});
	}

	render() {
		if (this.state.hasError) {
			return (
				<Segment style={errorBoundarySegmentStyle}>
					<Header size="large">An error has occurred</Header>
					<p>Please contact tech support.</p>
					<pre>{this.state.error?.message}</pre>
				</Segment>
			);
		}
		return <div className="blah">{this.props.children}</div>;
	}
}

export const ErrorBoundary = withRouter(ErrorBoundaryComponent);
