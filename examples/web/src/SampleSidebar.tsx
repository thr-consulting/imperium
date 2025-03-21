import {Button, Grid, GridColumn, GridRow, List, ListItem} from 'semantic-ui-react';

export function SampleSidebar() {
	return (
		<List>
			<ListItem>
				<Button content="Action 1" fluid color="green" />
			</ListItem>
			<ListItem>
				<Button content="Action 2" fluid color="green" />
			</ListItem>
		</List>
	);
}
