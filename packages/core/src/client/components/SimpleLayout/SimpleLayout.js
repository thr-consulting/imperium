import React from 'react';
import PropTypes from 'prop-types';

export default function ContainerLayout(props) {
	const statusbar = props.route.statusbar ? (
		<props.route.statusbar {...props}/>
	) : null;

	const content = props.route.content ? (
		<props.route.content {...props}/>
	) : null;

	const menu = props.route.menu ? (
		<props.route.menu {...props}/>
	) : null;

	const footer = props.route.footer ? (
		<props.route.footer {...props}/>
	) : null;

	return (
		<div>
			<div>{menu}</div>
			<div>{statusbar}</div>
			<div>{content}</div>
			<div>{footer}</div>
		</div>
	);
}

ContainerLayout.propTypes = {
	route: PropTypes.shape({
		statusbar: PropTypes.func,
		content: PropTypes.func,
		menu: PropTypes.func,
		footer: PropTypes.func,
	}),
};
