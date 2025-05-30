import type {DefineRouteOptions} from '@imperium/router';
import {Button} from 'semantic-ui-react';
import type {ActionSidebarItem, ContentData} from '../types';
import {getColor, getIcon, getText} from '../utils';

interface ActionSidebarItemComponentProps<T extends DefineRouteOptions, K extends keyof T> {
	item: ActionSidebarItem<T, K>;
	data: ContentData<T, K>;
}

export function ActionSidebarItemComponent<T extends DefineRouteOptions, K extends keyof T>({item, data}: ActionSidebarItemComponentProps<T, K>) {
	const icon = getIcon(item, data);

	return (
		<Button
			fluid
			color={getColor(item, data)}
			icon={!!icon}
			labelPosition={icon ? 'left' : undefined}
			onClick={() => {
				item.onClick(data);
			}}
		>
			{icon}
			{getText(item, data)}
		</Button>
	);
}
