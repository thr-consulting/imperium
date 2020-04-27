import {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import type {ServerModule} from '../index';

export const todoSeverModule: ServerModule = {
	name: 'Todo',
	async startup(server, context) {
		context.context.Todo.TodoLoader
	}
};
