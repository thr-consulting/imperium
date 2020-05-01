import debug from 'debug';
import type {ServerModule} from './index';

const d = debug('imperium.test-new-context.server.todo');

export const todoSeverModule: ServerModule = {
	name: 'Todo',
	async startup(server, context) {
		// do whatever startup you need in here.
		// make sure you pass the correct context into your domain methods.

		d("running todo's server module startup method. Contexts:", Object.keys(context));
	},
	resolvers(server) {
		return {
			Query: {
				someQuery(source, query, context) {
					return context.todoDomain.context.Todo.create({complete: true, title: 'finish ts for imperium graphql server module'}, context.todoDomain);
				},
			},
		};
	},
	schema: `
			type Todo {
				id: Int
				title: String
				complete: Boolean
			}
			extend type Query {
				someQuery: Todo
			}
			`,
};
