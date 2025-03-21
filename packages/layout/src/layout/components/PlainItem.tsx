import type {ComponentClass} from 'react';
import {useMediaQuery} from 'react-responsive';
import {Menu} from 'semantic-ui-react';
import type {Data} from '../../types';
import type {CustomLayoutItem, DropdownLayoutItem, LayoutItem, MenuLayoutItem} from '../types';
import {getIcon, getText, linkParameters} from '../utils';

interface PlainItemProps {
	item: Exclude<LayoutItem, MenuLayoutItem | DropdownLayoutItem | CustomLayoutItem>;
	data: Data;
	as?: ComponentClass;
}

export function PlainItem({item, data, as}: PlainItemProps) {
	const isMobile = useMediaQuery({query: '(max-width: 900px)'});
	const linkParams = linkParameters(item, data);

	const ItemX = as || Menu.Item;

	return (
		<ItemX {...linkParams} style={isMobile ? {paddingLeft: 8, paddingRight: 4} : undefined}>
			{getIcon(item, data)}
			{getText(item, data)}
		</ItemX>
	);
}
