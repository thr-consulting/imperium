import debug from 'debug';
import groupBy from 'lodash/groupBy';
import type {LayoutItem} from './types';
import {isDropdownLayoutItem, isMenuLayoutItem} from './types';

const d = debug('imperium.layout.layout.mergeItems');

function pullItems(items: LayoutItem[], pulled: LayoutItem[] = []): LayoutItem[] {
	return items.reduce((memo, item) => {
		if (isDropdownLayoutItem(item)) {
			return [
				...memo,
				{
					...item,
					dropdown: pullItems(item.dropdown, pulled),
				},
			];
		}

		if (isMenuLayoutItem(item)) {
			return [
				...memo,
				{
					...item,
					menu: pullItems(item.menu, pulled),
				},
			];
		}

		if (!item.moveToKey) {
			return [...memo, item];
		}

		pulled.push(item);
		return memo;
	}, [] as LayoutItem[]);
}

function addItems(items: LayoutItem[], pulled: Record<string, LayoutItem[]>): LayoutItem[] {
	return items.reduce((memo, item) => {
		if (isDropdownLayoutItem(item)) {
			const newItems = item.key && pulled[item.key] ? pulled[item.key] : [];
			return [
				...memo,
				{
					...item,
					dropdown: [...addItems(item.dropdown, pulled), ...newItems],
				},
			];
		}

		if (isMenuLayoutItem(item) && item.key) {
			const newItems = item.key && pulled[item.key] ? pulled[item.key] : [];
			return [
				...memo,
				{
					...item,
					menu: [...addItems(item.menu, pulled), ...newItems],
				},
			];
		}
		return [...memo, item];
	}, [] as LayoutItem[]);
}

export function moveItems(items: LayoutItem[]) {
	const pulled: LayoutItem[] = [];
	const itemsMinusPulled = pullItems(items, pulled);
	return addItems(itemsMinusPulled, groupBy(pulled, 'moveToKey'));
}
