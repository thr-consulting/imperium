import {ContextManager} from './ContextManager';
import {IImperiumServer} from './types';

// @ts-ignore
const mockServer: IImperiumServer = {
	connectors: {
		MyConnector: {},
	},
	environment: {},
	addEnvironment(): void {},
	modules: [],
};

function moduleFunc(/* server */) {
	return {
		MyDataModel: {
			fakeApiFn: () => 'fake api result',
		},
	};
}

describe('Context', () => {
	it('should add modules properly', () => {
		const context = new ContextManager(mockServer);
		context.addContext(moduleFunc);
		expect(context.MyDataModel).toMatchSnapshot();
	});

	it('should set and get auth data', () => {
		const context = new ContextManager(mockServer);
		context.auth = {name: 'test'};
		expect(context.auth).toMatchSnapshot();
	});

	it('should retrieve the connectors', () => {
		const context = new ContextManager(mockServer);
		expect(context.connectors).toMatchSnapshot();
	});
});
