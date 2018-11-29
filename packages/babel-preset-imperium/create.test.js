import create from './create';

describe('create', () => {
	it('should return the default development configuration', () => {
		const config = create(null, null, 'development');
		expect(config).toMatchSnapshot();
	});

	it('should return the default production configuration', () => {
		const config = create(null, null, 'production');
		expect(config).toMatchSnapshot();
	});

	it('should return the default test configuration', () => {
		const config = create(null, null, 'test');
		expect(config).toMatchSnapshot();
	});
});
