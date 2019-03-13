import React from 'react';
import PropTypes from 'prop-types';
import {Segment, TransitionablePortal} from 'semantic-ui-react';
import styles from './transit.css';

export default function Transit(props) {
	const {open, restoreRoute, routeKey, children} = props;

	return (
		<TransitionablePortal
			open={open}
			onClose={() => restoreRoute(routeKey)}
			transition={{animation: 'fade', duration: 400}}
		>
			<div className={styles.background}>
				<div className={styles.fill}>
					<Segment className={styles.style} basic>
						{children}
					</Segment>
				</div>
			</div>
		</TransitionablePortal>
	);
}

Transit.propTypes = {
	open: PropTypes.func.isRequired,
	restoreRoute: PropTypes.func.isRequired,
	routeKey: PropTypes.string.isRequired,
	children: PropTypes.any, // eslint-disable-line
};
