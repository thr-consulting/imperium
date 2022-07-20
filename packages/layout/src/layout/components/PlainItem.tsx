import type {ComponentClass} from 'react';
import {Anchor, Box, Sx, Text} from '@mantine/core';
import type {Data} from '../../types';
import type {CustomLayoutItem, DropdownLayoutItem, LayoutItem, MenuLayoutItem} from '../types';
import {getIcon, getText, linkParameters} from '../utils';

interface PlainItemProps {
	item: Exclude<LayoutItem, MenuLayoutItem | DropdownLayoutItem | CustomLayoutItem>;
	data: Data;
	as?: ComponentClass<{sx?: Sx}>;
}

export function PlainItem({item, data, as}: PlainItemProps) {
	const linkParams = linkParameters(item, data);

	if (typeof as !== 'undefined') {
		const ItemX = as;
		return (
			<ItemX {...linkParams} sx={{flex: '0 0 auto', alignSelf: 'auto'}}>
				{getIcon(item, data)}
				{getText(item, data)}
			</ItemX>
		);
	}
	if (item.to) {
		return (
			<Anchor
				{...linkParams}
				sx={theme => {
					return {
						flex: '0 0 auto',
						paddingLeft: theme.spacing.md,
						paddingRight: theme.spacing.md,
						paddingTop: theme.spacing.sm,
						paddingBottom: theme.spacing.sm,
					};
				}}
				variant="link"
			>
				{getIcon(item, data)}
				{getText(item, data)}
			</Anchor>
		);
	}
	return (
		<Text sx={{flex: '0 0 auto', alignSelf: 'auto'}}>
			{getIcon(item, data)}
			{getText(item, data)}
		</Text>
	);
}
