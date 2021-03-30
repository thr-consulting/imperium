import {AbstractEntityService} from '~lib/AbstractEntityService';
import type {Photo} from './Photo';

export class PhotoService extends AbstractEntityService<Photo> {
	async getByName(name: string): Promise<Photo | null> {
		// ctx.context.Authorization.throwUnlessCan('read', 'Photo');
		return this.repo.findOne({name});
	}
}
