import React from 'react';
import {Segment, TransitionablePortal} from 'semantic-ui-react';

const background = {
	width: '100%',
	height: '80vh',
	maxWidth: 350,
	maxHeight: 650,
	minHeight: 350,
	overflowY: 'auto',
	overflowX: 'hidden',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1000,
	borderRadius: 6,
	backgroundImage: 'url("/static/assets/imperium/auth/signin.jpg")',
	backgroundPosition: 'center top',
};

const fill = {
	background: 'linear-gradient(rgba(47, 47, 47, 0.4), #2f2f2f)',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
};

const style = {
	background: 'none',
	color: 'white',
	display: 'flex',
	flexDirection: 'column',
};

export default function Transit(props) {
	const {open, restoreRoute, routeKey, ...rest} = props;

	return (
		<TransitionablePortal
			open={open}
			onClose={() => restoreRoute(routeKey)}
			transition={{animation: 'fade', duration: 400}}
		>
			<div style={background}>
				<div style={fill}>
					<Segment style={style} basic>
						{React.cloneElement(props.children, rest)}
					</Segment>
				</div>
			</div>
		</TransitionablePortal>
	);
}
