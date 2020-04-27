import type {connectors} from './index';

export class Todo {
	static createDataLoader(conn: typeof connectors) {
		return conn.connections.mongo;
	}
}
