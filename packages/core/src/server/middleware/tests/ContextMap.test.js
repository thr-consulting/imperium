import ContextMap from '../ContextMap';

const connectors = {
	MyConnector: {},
};

function moduleFunc(connectors, context) {
	return {
		MyDataModel: {},
	};
}

describe('ContextMap', () => {
	it('should add modules properly', () => {
		const context = new ContextMap(connectors);
		context.addModule(moduleFunc);
	});
});
