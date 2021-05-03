import {User, Service} from '../user';
import {Score} from '../score';

/*
	Mikro-orm connector requires that we notify it of our entities.
	We also spread this variable into the context.
 */
export const entities = {
	User,
	Service,
	Score,
};
