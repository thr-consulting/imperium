import type {Context} from './index';

let id = 0;

export class Todo {
	static create({title, complete}: {title: string; complete: boolean}, context: Context) {
		// eslint-disable-next-line no-console
		console.log(context.context.Todo);
		return {id: id++, title, complete};
	}
}
