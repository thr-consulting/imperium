import debug from 'debug';
import {Menu} from 'semantic-ui-react';
import React, {Context} from 'react';

const d = debug('app.THR4Layout.UserMenu');

interface Props {
	MenuContext: Context<any>;
}

export default function UserMenu(props: Props) {
	d(props);
	// const [menuState, setMenuState] = useContext(props.MenuContext);

	const handleClick = (a: Record<string, unknown>) => {
		d(a);
		// setMenuState(prevState => ({
		// 	...prevState,
		// 	currentUser: {profile: {firstName: first, lastName: last, id}},
		// }));
	};

	return (
		<Menu vertical>
			<Menu.Item onClick={() => handleClick({first: 'Mike', last: 'Kornelsen', id: '1234'})}>Select Mike Kornelsen</Menu.Item>
			<Menu.Item onClick={() => handleClick({first: 'Shayne', last: 'Thiessen', id: '1235'})}>Select Shayne Thiessen</Menu.Item>
			<Menu.Item onClick={() => handleClick({first: 'Jonathan', last: 'Spomer', id: '1236'})}>Select Jonathan Spomer</Menu.Item>
		</Menu>
	);
}
