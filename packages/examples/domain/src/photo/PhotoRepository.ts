import {BaseRepository} from '../BaseRepository';
import {Photo} from './Photo';

export class PhotoRepository extends BaseRepository<Photo> {
	// static async getByName(name: string, ctx: Context): Promise<Photo | undefined> {
	// 	// ctx.context.Authorization.throwUnlessCan('read', 'Photo');
	// 	const p = await getRepository(Photo).findOne({name}, {loadRelationIds: true});
	// 	// ctx.context.Authorization.throwUnlessCan('read', p);
	// 	return p;
	// }
	//
	// static create(entityLike: DeepPartial<Photo>) {
	// 	return getRepository(Photo).create(entityLike);
	// }
	//
	// static async add(photo: Photo, ctx: Context) {
	// 	// ctx.context.Authorization.throwUnlessCan('create', 'Photo');
	// 	await getRepository(Photo).save(photo);
	// }
}
