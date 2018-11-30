import initialConfig from './initialConfig';

describe('initialConfig', () => {
	it('should return the initial configuration', () => {
		process.env.GRAPHQL_HOST = 'testhost';
		expect(initialConfig()).toMatchSnapshot();
	});
});
