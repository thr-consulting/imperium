import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import sidebars from '../../../apiSidebar';

const key = 'util';

function Server(props) {
	return (
		<Layout title={sidebars.apiPages[key].title} noFooter>
			<div className="api-doc">
				<div className="hide-logo">
					<DocSidebar docsSidebars={sidebars.apiSidebar} path={props.route.path} sidebar="apiSidebar" />
				</div>
				<main>
					<div className="iframe-container">
						<iframe title={sidebars.apiPages[key].title} src={useBaseUrl(`/apistatic/${sidebars.apiPages[key].path}/index.html`)} />
					</div>
				</main>
			</div>
		</Layout>
	);
}

export default Server;
