import React from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '@imperium/context';

export default function AuthContextConsumer(props) {
	return (
		<AuthContext.Consumer>
			{children => props.children(children)}
		</AuthContext.Consumer>
	);
}

AuthContextConsumer.propTypes = {
	children: PropTypes.any, // eslint-disable-line
};
