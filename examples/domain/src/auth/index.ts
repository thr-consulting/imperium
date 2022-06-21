import type {DomainModule, Permissions} from '@imperium/domaindriven';
import debug from 'debug';
import type {Repositories} from '../core/createRepositories';
import {Permission} from '../core/graphql';

const d = debug('imperium.domain.auth');

const permissions: Permissions<Repositories> = {
	[Permission.GetStuff]: async ({data, userId}) => {
		d('getStuff', userId, data);
		return true;
	},
	[Permission.GetMore]: async () => {
		return false;
	},
	[Permission.GetPing]: async ({data, userId}) => {
		d('getping');
		d(userId);
		d(data);
		return true;
	},
	[Permission.GetLoc]: async ({data, userId}) => {
		d('getloc');
		d(userId);
		d(data);
		return false;
	},
};

export const authModule: DomainModule<Repositories> = {
	permissions,
};
