import {IContextManager} from '../src';

declare module 'express-serve-static-core' {
	interface Request {
		contextManager: IContextManager;
	}
}
