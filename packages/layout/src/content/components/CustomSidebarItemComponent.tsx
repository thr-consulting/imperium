import type {DefineRouteOptions} from '@imperium/router';
import type {ContentData, CustomSidebarItem} from '../types';

interface CustomSidebarItemComponentProps<T extends DefineRouteOptions, K extends keyof T> {
	item: CustomSidebarItem<T, K>;
	data: ContentData<T, K>;
}

export function CustomSidebarItemComponent<T extends DefineRouteOptions, K extends keyof T>({item, data}: CustomSidebarItemComponentProps<T, K>) {
	return item.render(data);
}
