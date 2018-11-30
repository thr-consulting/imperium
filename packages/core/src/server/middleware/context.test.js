import context from './context';

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
		context({
			connectors: myConnectors,
			modules: [{models: moduleFunc}],
		})(req, null, next);
		expect(req.context.getModel('MyDataModel')).toMatchSnapshot();
		expect(next.mock.calls.length).toBe(1);
	});
});
