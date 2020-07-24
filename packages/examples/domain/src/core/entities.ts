import {User, Services} from '../user';
import {Score} from '../other';
import {Category, Photo, Comment} from '../photo';

/*
	Mikro-orm connector requires that we notify it of our entities.
	We also spread this variable into the context.
 */
export const entities = {
	User,
	Services,
	Score,
	Category,
	Photo,
	Comment,
};
