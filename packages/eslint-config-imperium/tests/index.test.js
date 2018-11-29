import config from '../index';

describe('ESLint Config', () => {
	it('should match the config', () => {
		expect(config).toMatchSnapshot();
	});
});
