import {IImperiumServer} from '@imperium/server';
import debug from 'debug';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EventSubscriber,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import {HistoryActionColumn, HistoryActionType, HistoryEntityInterface, HistorySubscriber} from 'typeorm-revisions';
import OrderedDataLoader from '../lib/OrderedDataLoader';
import {Todo} from './Todo';

const d = debug('app.todo.server.models.User');

interface UserInput {
	firstName?: string;
	lastName?: string;
	passwordHash?: string;
	todos?: Todo[];
}

export type ContextMapFunc = (server: IImperiumServer, contextManager: IContextManager) => ContextMap;
export type Context = any;
export type ContextMap = {
	readonly [prop: string]: Context;
};
export type IContextManager<T extends ContextMap = any> = {
	addContext(contextFunc: ContextMapFunc): void;
	auth: any;
	readonly server: IImperiumServer;
} & T;

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	firstName!: string;

	@Column('varchar')
	lastName!: string;

	@Column('varchar', {select: false})
	passwordHash?: string;

	@OneToMany(
		type => Todo,
		todo => todo.user,
	)
	todos!: Todo[]; // TypeORM initialises this.

	static createLoader() {
		return new OrderedDataLoader<number, User>(keys => this.findByIds(keys));
	}

	static get(args: UserInput, context: IContextManager<{User: OrderedDataLoader<number, User>}>) {
		// cannot use loadMany unless we have the id's or the id field
		return this.find(args);
	}

	static getOne(id: number, context: IContextManager<{User: OrderedDataLoader<number, User>}>) {
		return context.User.load(id);
	}

	constructor(user?: UserInput) {
		super();
		if (user) {
			const {firstName, lastName, passwordHash, todos} = user;
			this.firstName = firstName;
			this.lastName = lastName;
			this.passwordHash = passwordHash;
			this.todos = todos;
		}
	}
}

@Entity()
class UserHistory extends User implements HistoryEntityInterface {
	@Column('integer')
	public originalID!: number;

	@CreateDateColumn({type: 'timestamp with time zone'})
	public makeActionAt!: Date;

	@HistoryActionColumn()
	public action!: HistoryActionType;
}

@EventSubscriber()
class UserHistorySubscriber extends HistorySubscriber<User, UserHistory> {
	public get entity() {
		return User;
	}

	public get historyEntity() {
		return UserHistory;
	}
}

export {User, UserHistory, UserHistorySubscriber};
