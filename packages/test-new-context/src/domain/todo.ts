import debug from 'debug';
import type {Context} from './index';

const d = debug('imperium.test-new-context.domain.todo');

let id = 0;

export class Todo {
	static create({title, complete}: {title: string; complete: boolean}, context: Context) {
		d('create new todo.');
		return {id: id++, title, complete};
	}
}
