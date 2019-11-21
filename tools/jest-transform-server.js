module.exports = require('babel-jest').createTransformer({
	presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
});
