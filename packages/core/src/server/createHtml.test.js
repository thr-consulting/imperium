/* eslint-disable global-require */
import fs from 'fs';

jest.spyOn(fs, 'readFile').mockImplementation((path, opts, cb) => cb(null, 'sample'));

beforeEach(() => {
	jest.resetModules();
});

describe('createHtml', () => {
	it('should produce html in development mode', async () => {
		const createHtml = require('./createHtml').default;

		const hmrInstance = {
			waitUntilValid: jest.fn().mockImplementation(a => a()),
			fileSystem: {
				readFileSync: jest.fn().mockReturnValue('sample'),
			},
		};

		const res = {
			write: jest.fn(),
			end: jest.fn(),
		};

		(await createHtml(hmrInstance))(null, res);
		expect(res.write.mock.calls[0][0]).toBe('sample');
		expect(res.end.mock.calls.length).toBe(1);
	});

	it('should produce html in production mode', async () => {
		process.env.NODE_ENV = 'production';
		const createHtml = require('./createHtml').default;

		const res = {
			write: jest.fn(),
			end: jest.fn(),
		};

		(await createHtml())(null, res);
		expect(res.write.mock.calls[0][0]).toBe('sample');
	});
});
