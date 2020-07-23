import {AbstractEntityService} from '../AbstractEntityService';
import type {DomainConnectors} from '../DomainConnectors';
import type {Photo} from './Photo';

export class PhotoService extends AbstractEntityService<Photo, DomainConnectors> {
	async getByName(name: string): Promise<Photo | null> {
		// ctx.context.Authorization.throwUnlessCan('read', 'Photo');
		return this.repo.findOne({name});
	}
}
