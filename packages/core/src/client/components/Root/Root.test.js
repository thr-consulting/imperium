import React from 'react';
import {shallow} from 'enzyme';
import PropTypes from 'prop-types';
import Root from './Root';

function checkPermissions() {
	return true;
}

function inner({Child}) {
	return (
		<Child checkPermissions={checkPermissions}/>
	);
}

inner.propTypes = {
	Child: PropTypes.func,
};

describe('Root', () => {
	it('should render without throwing an error', () => {
		const render = jest.fn().mockImplementation(inner);
		const routes = {MyRoute: 'testroute'};
		const store = {
			subscribe: jest.fn(),
			dispatch: jest.fn(),
			getState: jest.fn(),
		};

		expect(shallow(
			<Root render={render} store={store} routes={routes}/>
		)).toMatchSnapshot();
	});
});
