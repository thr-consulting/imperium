import debug from 'debug';
import {ImperiumServerModule} from '@imperium/server';
import {ImperiumTypeormServerModule} from '@imperium/typeorm';
import faker from 'faker';
import TodoSchema from './graphql/Todo.graphqls';
import {Todo, TodoHistory, TodoHistorySubscriber, User, UserHistory, UserHistorySubscriber} from './models';

const d = debug('app.todo.server');

export default function TodoServerModule(): ImperiumServerModule & ImperiumTypeormServerModule {
	return {
		name: 'Todo',
		async startup() {
			if ((await User.count()) < 3) {
				const user = await new User({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					passwordHash: faker.lorem
						.words()
						.split(' ')
						.join(''),
				}).save();
				await new Todo({title: faker.lorem.words(), user}).save();
				await new Todo({title: faker.lorem.words(), user}).save();
				await new Todo({title: faker.lorem.words(), user}).save();
				await user.save();
			}
		},
		schema: [TodoSchema],
		resolvers() {
			return {
				User: {
					todos: user => Todo.getByUser(user),
				},
				Query: {
					getUsers: (obj, args, context) => User.get({}, context),
					getUser: (obj, {id}, context) => User.getOne(id, context),
					getTodoHistory: (obj, {userId}) => TodoHistory.getByUser({id: userId}),
				},
				Mutation: {
					editTodo: async (obj, {id, title, completed}) => Todo.getRepository().save({id, title, completed}),
				},
			};
		},
		context() {
			return {
				User: User.createLoader(),
				Todo: Todo.createLoader(),
				TodoHistory: TodoHistory.createLoader(),
			};
		},
		entities() {
			return [User, Todo, UserHistory, TodoHistory];
		},
		subscribers() {
			return [UserHistorySubscriber, TodoHistorySubscriber];
		},
	};
}
