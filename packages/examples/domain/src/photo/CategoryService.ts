import {AbstractEntityService} from '~lib/AbstractEntityService';
import type {Category} from './Category';

export class CategoryService extends AbstractEntityService<Category> {
	async getByName(name: string): Promise<Category | null> {
		// ctx.context.Authorization.throwUnlessCan('read', Category);
		return this.repo.findOne({name});
	}
}
