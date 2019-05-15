import contextMiddleware from './contextMiddleware';

const myConnectors = {
	MyConnector: {},
};

function moduleFunc(/* connectors, context */) {
	return {
		MyDataModel: {
			fakeApiFn: () => 'fake api result',
		},
	};
}

describe('context', () => {
	it('should execute the middleware properly', () => {
		const req = {};
		const next = jest.fn();
		contextMiddleware({
			connectors: myConnectors,
			modules: [{models: moduleFunc}],
		})(req, null, next);
		expect(req.context.getModel('MyDataModel')).toMatchSnapshot();
		expect(next.mock.calls.length).toBe(1);
	});
});
