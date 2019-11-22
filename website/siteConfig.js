/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
	{
		caption: 'Making Your Miles Count',
		image: '/imperium/img/logos/mymc.png',
		infoLink: 'http://makingyourmilescount.com',
		pinned: true,
	},
];

const siteConfig = {
	title: 'Imperium', // Title for your website.
	tagline: 'A robust and modular framework for web apps.',
	url: 'https://darkadept.github.io/imperium', // Your website URL
	baseUrl: '/imperium/', // Base URL for your project */
	// For github.io type URLs, you would set the url and baseUrl like:
	//   url: 'https://facebook.github.io',
	//   baseUrl: '/test-site/',

	// Used for publishing and more
	projectName: 'imperium',
	organizationName: 'darkadept',
	// For top-level user or org sites, the organization is still the same.
	// e.g., for the https://JoelMarcey.github.io site, it would be set like...
	//   organizationName: 'JoelMarcey'

	// For no header links in the top nav bar -> headerLinks: [],
	headerLinks: [
		{doc: 'overview', label: 'Docs'},
		// {doc: '', label: 'API'},
		// {page: 'help', label: 'Help'},
		{href: 'https://github.com/darkadept/imperium', label: 'GitHub'},
	],
	noIndex: false, // TODO FORMIK
	search: true, // TODO FORMIK

	// If you have users set above, you add it here:
	users,

	/* path to images for header/footer */
	headerIcon: 'img/imperium_w.png',
	footerIcon: 'img/imperium_w.png',
	favicon: 'img/favicon.png',

	/* Colors for website */
	colors: {
		primaryColor: '#000000',
		secondaryColor: '#c5bac0',
	},

	/* Custom fonts for website */
	fonts: {
		sans: [
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Open Sans',
			'Helvetica Neue',
			'sans-serif',
		],
	},

	// This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
	copyright: `Copyright © ${new Date().getFullYear()} Mike Kornelson. All Rights Reserved.`,

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks.
		theme: 'default',
	},
	usePrism: ['jsx', 'typescript'], // TODO FORMIK

	// Add custom scripts here that would be placed in <script> tags.
	scripts: [
		'https://buttons.github.io/buttons.js',
		'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
		// '/formik/js/code-blocks-buttons.js',
	],

	// On page navigation for the current documentation page.
	onPageNav: 'separate',
	// No .html extensions for paths.
	cleanUrl: true,

	// Open Graph and Twitter card images.
	ogImage: 'img/undraw_online.svg',
	twitterImage: 'img/undraw_tweetstorm.svg',

	// For sites with a sizable amount of content, set collapsible to true.
	// Expand/collapse the links and subcategories under categories.
	// docsSideNavCollapsible: true,

	// Show documentation's last contributor's name.
	// enableUpdateBy: true,

	// Show documentation's last update time.
	// enableUpdateTime: true,

	// You may provide arbitrary config keys to be used as needed by your
	// template. For example, if you need your repo's URL...
	//   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
