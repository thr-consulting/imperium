import { BaseEntity } from 'typeorm';
import { HistoryActionType, HistoryEntityInterface, HistorySubscriber } from 'typeorm-revisions';
import { Todo } from './Todo';
interface UserInput {
    firstName?: string;
    lastName?: string;
    passwordHash?: string;
    todos?: Todo[];
}
declare class User extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    passwordHash?: string;
    todos: Todo[];
    static createLoader(): any;
    static get(args: UserInput, context: any): Promise<User[]>;
    static getOne(id: number, context: any): any;
    constructor(user?: UserInput);
}
declare class UserHistory extends User implements HistoryEntityInterface {
    originalID: number;
    makeActionAt: Date;
    action: HistoryActionType;
}
declare class UserHistorySubscriber extends HistorySubscriber<User, UserHistory> {
    get entity(): typeof User;
    get historyEntity(): typeof UserHistory;
}
export { User, UserHistory, UserHistorySubscriber };
