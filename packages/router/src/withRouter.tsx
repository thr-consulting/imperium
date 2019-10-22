import React from 'react';
import {BrowserRouter} from 'react-router-dom';

export default function withRouter() {
	return (WrappedComponent: () => JSX.Element) => {
		return function includeRouter(props: any): JSX.Element {
			return (
				<BrowserRouter>
					<WrappedComponent {...props} />
				</BrowserRouter>
			);
		};
	};
}
