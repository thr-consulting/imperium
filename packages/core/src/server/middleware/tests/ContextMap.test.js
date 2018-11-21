import ContextMap from '../ContextMap';

const myConnectors = {
	MyConnector: {},
};

function moduleFunc(/* connectors, context */) {
	return {
		MyDataModel: {},
	};
}

describe('ContextMap', () => {
	it('should add modules properly', () => {
		const context = new ContextMap(myConnectors);
		context.addModule(moduleFunc);
	});
});
