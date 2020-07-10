import {BaseRepository} from '../BaseRepository';
import type {Category} from './Category';

export class CategoryRepository extends BaseRepository<Category> {
	async getByName(name: string): Promise<Category | null> {
		// ctx.context.Authorization.throwUnlessCan('read', Category);
		return this.repo.findOne({name});
	}
}
