import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import React, {ComponentType} from 'react';
import {DataHooks} from './components/DataHooks';
import {Layout} from './components/Layout';
import {isImperiumLayoutClientModule, LayoutData, ImperiumLayoutClientModule} from './types';

const d = debug('imperium.layout.withLayout');

const initialLayoutModuleData: LayoutData = {
	dataHooks: [],
	menubar: [],
	statusbar: [],
	sidebar: [],
	footer: [],
};

export function withLayout(client: ImperiumClient): Hoc {
	const layoutModuleData = client.modules.reduce((memo, module) => {
		if (isImperiumLayoutClientModule(module)) {
			return {
				dataHooks: [...memo.dataHooks, ...(module.layout.dataHooks || [])],
				menubar: [...memo.menubar, ...(module.layout.menubar || [])],
				statusbar: [...memo.statusbar, ...(module.layout.statusbar || [])],
				sidebar: [...memo.sidebar, ...(module.layout.sidebar || [])],
				footer: [...memo.footer, ...(module.layout.footer || [])],
			} as Required<ImperiumLayoutClientModule['layout']>;
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
				</>
			);
		}

		WithLayout.displayName = `withLayout(${displayName})`;

		return WithLayout;
	};
}
