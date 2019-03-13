import React from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react';
import styles from './styles.css';

export default function FullWidthLayout(props) {
	const sidebar = props.route.sidebar ? (
		<div className={styles.menu}>
			<props.route.sidebar {...props}/>
		</div>
	) : null;

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
		<div className={styles.parent}>
			<div className={styles.header}>
				{menu}
				{statusbar}
			</div>
			<Segment attached className={styles.wrapper}>
				{sidebar}
				<div className={styles.content}>
					{content}
				</div>
			</Segment>
			{footer}
		</div>
	);
}

FullWidthLayout.propTypes = {
	route: PropTypes.shape({
		statusbar: PropTypes.func,
		sidebar: PropTypes.func,
		content: PropTypes.func,
		menu: PropTypes.func,
		footer: PropTypes.func,
	}),
};
