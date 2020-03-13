const apiPages = {
	authClient: {
		title: 'Auth-Client',
		path: 'auth-client',
	},
	authGraphqlClient: {
		title: 'Auth-Graphql-Client',
		path: 'auth-graphql-client',
	},
	authServer: {
		title: 'Auth-Server',
		path: 'auth-server',
	},
	client: {
		title: 'Client',
		path: 'client',
	},
	graphqlClient: {
		title: 'GraphQL-Client',
		path: 'graphql-client',
	},
	graphqlServer: {
		title: 'GraphQL-Server',
		path: 'graphql-server',
	},
	router: {
		title: 'Router',
		path: 'router',
	},
	server: {
		title: 'Server',
		path: 'server',
	},
	util: {
		title: 'Util',
		path: 'util',
	},
};

const items = Object.keys(apiPages).map(key => {
	return {
		type: 'link',
		label: apiPages[key].title,
		href: `/imperium/api/${apiPages[key].path}`,
	};
});

const apiSidebar = {
	apiSidebar: [
		{
			type: 'category',
			label: 'API',
			items,
			collapsed: false,
		},
	],
};

export default {apiPages, apiSidebar};
