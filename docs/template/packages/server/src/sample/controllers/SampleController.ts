import {TemplateController} from '~core/TemplateController';
import type {Repositories} from '~core/createRepositories';

export class SampleController extends TemplateController<Repositories> {
	getById(id: string) {
		return this.repos.sample.getById(id);
	}
}
