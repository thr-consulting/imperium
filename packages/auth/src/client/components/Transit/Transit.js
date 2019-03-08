import React from 'react';
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
