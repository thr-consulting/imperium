import debug from 'debug';
import React from 'react';

const d = debug('imperium.router.RouteDirector.RouteErrorBoundary');

interface State {
	hasError: boolean;
}

export default class RouteErrorBoundary extends React.Component {
	// eslint-disable-next-line react/state-in-constructor
	state: State;

	constructor(props: any) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError(/* error */): Record<string, unknown> {
		return {hasError: true};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		d(error);
		d(errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>;
		}
		// eslint-disable-next-line react/prop-types
		return this.props.children;
	}
}
