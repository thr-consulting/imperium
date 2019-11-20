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
import OrderedDataLoader from '../../../../web/src/todo/lib/OrderedDataLoader';
import {Todo} from './Todo';

const d = debug('app.todo.server.models.User');

interface UserInput {
	firstName?: string;
	lastName?: string;
	passwordHash?: string;
	todos?: Todo[];
}

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

	static get(args: UserInput, context) {
		return this.find(args);
	}

	static getOne(id: number, context) {
		return context.models.User.load(id);
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
