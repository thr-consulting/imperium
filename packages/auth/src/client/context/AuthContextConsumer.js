import React from 'react';
import PropTypes from 'prop-types';
import {Context} from './context';

export default function AuthContextConsumer(props) {
	return (
		<Context.Consumer>
			{children => props.children(children)}
		</Context.Consumer>
	);
}

AuthContextConsumer.propTypes = {
	children: PropTypes.any, // eslint-disable-line
};
