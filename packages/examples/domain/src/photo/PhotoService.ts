import {AbstractEntityService} from '../lib/AbstractEntityService';
import type {DomainConnectors} from '../core/DomainConnectors';
import type {Photo} from './Photo';

export class PhotoService extends AbstractEntityService<Photo, DomainConnectors> {
	async getByName(name: string): Promise<Photo | null> {
		// ctx.context.Authorization.throwUnlessCan('read', 'Photo');
		return this.repo.findOne({name});
	}
}
