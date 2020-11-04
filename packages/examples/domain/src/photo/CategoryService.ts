import {AbstractEntityService} from '~lib/AbstractEntityService';
import type {Category} from './Category';
import type {DomainConnectors} from '../core/DomainConnectors';

export class CategoryService extends AbstractEntityService<Category, DomainConnectors> {
	async getByName(name: string): Promise<Category | null> {
		// ctx.context.Authorization.throwUnlessCan('read', Category);
		return this.repo.findOne({name});
	}
}
