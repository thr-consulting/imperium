import debug from 'debug';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EventSubscriber,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import {HistoryActionColumn, HistoryActionType, HistoryEntityInterface, HistorySubscriber} from 'typeorm-revisions';
import OrderedDataLoader from '../lib/OrderedDataLoader';
import {User} from './User';

const d = debug('app.todo.server.models.Todo');

interface TodoInput {
	title?: string;
	completed?: boolean;
	user?: User;
}

@Entity()
class Todo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(
		type => User,
		user => user.todos,
	)
	user!: User;

	@Column('varchar')
	title!: string;

	@Column('boolean')
	completed!: boolean;

	static createLoader() {
		return new OrderedDataLoader(keys => this.findByIds(keys));
	}

	static async getByUser(user) {
		// cannot do this with data loader because we dont have the id.
		return this.find({where: {user}, order: {id: 'ASC'}});
	}

	static async getOne(id, context) {
		return context.Todo.load(id);
	}

	constructor(todo: TodoInput = {}) {
		super();
		const {title, completed, user} = todo;
		this.title = title || 'New Todo';
		this.completed = completed || false;
		this.user = user;
	}
}

@Entity()
class TodoHistory extends Todo implements HistoryEntityInterface {
	@Column('integer')
	public originalID!: number;

	@CreateDateColumn({type: 'timestamp with time zone'})
	public makeActionAt!: Date;

	@HistoryActionColumn()
	public action!: HistoryActionType;

	static createLoader() {
		return new OrderedDataLoader(keys => this.findByIds(keys));
	}

	static async getByUser(user) {
		// cannot do this with data loader because we dont have the id.
		return this.find({where: {user}, order: {id: 'ASC'}});
	}

	static async getOne(id, context) {
		return context.Todo.load(id);
	}
}

@EventSubscriber()
class TodoHistorySubscriber extends HistorySubscriber<Todo, TodoHistory> {
	get entity() {
		return Todo;
	}

	get historyEntity() {
		return TodoHistory;
	}
}

export {Todo, TodoHistory, TodoHistorySubscriber};
