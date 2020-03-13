module.exports = {
	title: 'Imperium Framework',
	tagline: 'Modular web framework',
	url: 'https://darkadept.github.io/imperium',
	baseUrl: '/imperium/',
	favicon: 'img/favicon.png',
	organizationName: 'darkadept', // Usually your GitHub org/user name.
	projectName: 'imperium', // Usually your repo name.
	themeConfig: {
		navbar: {
			title: 'Imperium',
			logo: {
				alt: 'Imperium',
				src: 'img/imperium.png',
			},
			links: [
				{
					to: 'docs/introduction',
					activeBasePath: 'docs',
					label: 'Docs',
					position: 'left',
				},
				{
					to: 'api/server',
					activeBasePath: 'api',
					label: 'API',
					position: 'left',
				},
				{
					href: 'https://github.com/darkadept/imperium',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Introduction',
							to: 'docs/introduction',
						},
						{
							label: 'Routes',
							to: 'docs/routes',
						},
					],
				},
				{
					title: 'Social',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/facebook/docusaurus',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Mike Kornelson`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					path: '../docs',
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
