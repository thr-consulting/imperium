import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

export default function withRouter() {
	return (WrappedComponent: () => JSX.Element) => {
		return function includeRouter(props: any): JSX.Element {
			return (
				<Router>
					<WrappedComponent {...props} />
				</Router>
			);
		};
	};
}
