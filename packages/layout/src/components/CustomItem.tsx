import type {CustomMenuItem} from '../types';

interface CustomItemProps {
	item: CustomMenuItem;
}

export function CustomItem({item}: CustomItemProps) {
	return item.render();
}
