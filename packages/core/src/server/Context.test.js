import Context from './Context';

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

describe('Context', () => {
	it('should add modules properly', () => {
		const context = new Context(myConnectors);
		context.addModule(moduleFunc);
		expect(context.getModel('MyDataModel')).toMatchSnapshot();
		expect(context.models.MyDataModel).toMatchSnapshot();
	});

	it('should set and get auth data', () => {
		const context = new Context(myConnectors);
		context.auth = {name: 'test'};
		expect(context.auth).toMatchSnapshot();
	});

	it('should retrieve the connectors', () => {
		const context = new Context(myConnectors);
		expect(context.connectors).toMatchSnapshot();
	});
});
