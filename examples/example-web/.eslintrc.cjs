process.env.ESLINT_CONFIG_THX = JSON.stringify({
	react: true,
});

module.exports = {
	extends: ['@thx/eslint-config-thx'],
	parserOptions: {
		project: './**/tsconfig-eslint.json'
	},
};
