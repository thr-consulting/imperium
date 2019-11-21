import commonWebpack from './commonWebpack';

describe('commonWebpack', () => {
	it('should work in dev/server mode', () => {
		const out = commonWebpack({
			isProduction: false,
			entry: 'entry.ts',
			isClient: false,
			name: 'commonWebpackTest',
			outputFile: 'out.ts',
		});
		expect(out).toMatchSnapshot();
	});

	it('should work in dev/client mode', () => {
		const out = commonWebpack({
			isProduction: false,
			entry: 'entry.ts',
			isClient: true,
			name: 'commonWebpackTest',
			outputFile: 'out.ts',
		});
		expect(out).toMatchSnapshot();
	});

	it('should work in prod/server mode', () => {
		const out = commonWebpack({
			isProduction: true,
			entry: 'entry.ts',
			isClient: false,
			name: 'commonWebpackTest',
			outputFile: 'out.ts',
		});
		expect(out).toMatchSnapshot();
	});

	it('should work in prod/client mode', () => {
		const out = commonWebpack({
			isProduction: true,
			entry: 'entry.ts',
			isClient: true,
			name: 'commonWebpackTest',
			outputFile: 'out.ts',
		});
		expect(out).toMatchSnapshot();
	});
});
