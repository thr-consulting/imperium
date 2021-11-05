import type {CustomLayoutItem} from '../types';
import type {Data} from '../../types';

interface CustomLayoutItemComponentProps {
	item: CustomLayoutItem;
	data: Data;
}

export function CustomLayoutItemComponent({item, data}: CustomLayoutItemComponentProps) {
	return item.render(data);
}
