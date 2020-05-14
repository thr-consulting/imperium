interface History {
    id: number;
    makeActionAt: Date;
    originalID: number | string;
    action: 'CREATED' | 'UPDATED' | 'DELETED';
}
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    todos: Todo[];
}
export interface UserHistory extends User, History {
}
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
export interface TodoHistory extends Todo, History {
}
export {};
