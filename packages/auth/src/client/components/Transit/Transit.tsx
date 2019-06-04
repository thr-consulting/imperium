import React from 'react';
import {Segment, TransitionablePortal} from 'semantic-ui-react';
import debug from 'debug';
import styles from './transit.css';

const d = debug('imperium.auth.Transit');

interface Props {
	open: boolean,
	restoreRoute: (routeKey: string) => void,
	routeKey: string,
	children: any,
}

export default function Transit(props: Props) {
	const {open, restoreRoute, routeKey, children} = props;

	return (
		<TransitionablePortal
			open={open}
			onClose={() => {
				d('Transit onClose, restoring route...');
				restoreRoute(routeKey);
			}}
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
