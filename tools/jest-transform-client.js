module.exports = require('babel-jest').createTransformer({
	presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true}]],
});
