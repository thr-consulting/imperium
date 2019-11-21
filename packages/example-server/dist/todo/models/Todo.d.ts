import { BaseEntity } from 'typeorm';
import { HistoryActionType, HistoryEntityInterface, HistorySubscriber } from 'typeorm-revisions';
import { User } from './User';
interface TodoInput {
    title?: string;
    completed?: boolean;
    user?: User;
}
declare class Todo extends BaseEntity {
    id: number;
    user: User;
    title: string;
    completed: boolean;
    static createLoader(): any;
    static getByUser(user: any): Promise<Todo[]>;
    static getOne(id: any, context: any): Promise<any>;
    constructor(todo?: TodoInput);
}
declare class TodoHistory extends Todo implements HistoryEntityInterface {
    originalID: number;
    makeActionAt: Date;
    action: HistoryActionType;
    static createLoader(): any;
    static getByUser(user: any): Promise<TodoHistory[]>;
    static getOne(id: any, context: any): Promise<any>;
}
declare class TodoHistorySubscriber extends HistorySubscriber<Todo, TodoHistory> {
    get entity(): typeof Todo;
    get historyEntity(): typeof TodoHistory;
}
export { Todo, TodoHistory, TodoHistorySubscriber };
