import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import {useState} from 'react';
import {Button} from 'semantic-ui-react';
import type {ActionFormSidebarItem, ContentData} from '../types';
import {getColor, getIcon, getText} from '../utils';
import {ActionForm} from './ActionForm';

const d = debug('imperium.layout.content.components.ActionFormSidebarItemComponent');

interface ActionFormSidebarItemComponentProps<T extends DefineRouteOptions, K extends keyof T> {
	item: ActionFormSidebarItem<T, K>;
	data: ContentData<T, K>;
}

export function ActionFormSidebarItemComponent<T extends DefineRouteOptions, K extends keyof T>({
	item,
	data,
}: ActionFormSidebarItemComponentProps<T, K>) {
	const [isEdit, setIsEdit] = useState(false);

	if (isEdit) {
		return (
			<ActionForm
				item={item}
				data={data}
				onHideForm={() => {
					setIsEdit(false);
				}}
			/>
		);
	}

	const icon = getIcon(item, data);

	// Render action button
	return (
		<Button
			fluid
			compact
			color={getColor(item, data)}
			icon={!!icon}
			labelPosition={icon ? 'left' : undefined}
			onClick={() => {
				setIsEdit(true);
			}}
		>
			{icon}
			{getText(item, data)}
		</Button>
	);
}
