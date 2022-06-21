import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import type {ComponentType} from 'react';
import {DataHooks} from '../datahooks/DataHooks';
import {PermissionHooks} from '../datahooks/PermissionHooks';
import {Permissions} from '../datahooks/Permissions';
import {isImperiumLayoutClientModule} from '../types';
import {Layout} from './components/Layout';
import type {LayoutData} from './types';

const d = debug('imperium.layout.withLayout');

const initialLayoutModuleData: Required<LayoutData> = {
	dataHooks: [],
	permissionSelectorHooks: [],
	permissions: [],
	primaryMenu: [],
	statusbar: [],
	secondaryMenu: [],
	footer: [],
};

export function withLayout(client: ImperiumClient): Hoc {
	const layoutModuleData = client.modules.reduce((memo, module) => {
		if (isImperiumLayoutClientModule(module)) {
			return {
				dataHooks: [...(memo.dataHooks || []), ...(module.layout.dataHooks || [])],
				permissionSelectorHooks: [...(memo.permissionSelectorHooks || []), ...(module.layout.permissionSelectorHooks || [])],
				permissions: [...(memo.permissions || []), ...(module.layout.permissions || [])],
				primaryMenu: [...(memo.primaryMenu || []), ...(module.layout.primaryMenu || [])],
				statusbar: [...(memo.statusbar || []), ...(module.layout.statusbar || [])],
				secondaryMenu: [...(memo.secondaryMenu || []), ...(module.layout.secondaryMenu || [])],
				footer: [...(memo.footer || []), ...(module.layout.footer || [])],
			} as Required<LayoutData>;
		}
		return memo;
	}, initialLayoutModuleData);
	d('Layout items processed', layoutModuleData);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function layoutHoc(Wrapped: ComponentType<any>) {
		const displayName = Wrapped.displayName || Wrapped.name || '';

		function WithLayout(props: unknown) {
			return (
				<>
					<Layout {...layoutModuleData}>
						<Wrapped {...props} layout={layoutModuleData} />
					</Layout>
					<DataHooks dataHooks={layoutModuleData.dataHooks} />
					<Permissions permissions={layoutModuleData.permissions} />
					<PermissionHooks permissionHooks={layoutModuleData.permissionSelectorHooks} />
				</>
			);
		}

		WithLayout.displayName = `withLayout(${displayName})`;

		return WithLayout;
	};
}
