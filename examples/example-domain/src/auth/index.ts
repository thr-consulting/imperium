import type {DomainModule, Permissions} from '@imperium/domaindriven';
import debug from 'debug';
import type {Repositories} from '../core/createRepositories';
import {Permission} from '../core/graphql';

const d = debug('imperium.example-domain.auth');

const permissions: Permissions<Repositories> = {
	[Permission.GetStuff]: async ({data, userId}) => {
		d('getStuff', userId, data);
		return true;
	},
	[Permission.GetMore]: async () => {
		d('getmore');
		return false;
	},
	[Permission.GetPing]: async ({data, userId}) => {
		d('getping', userId, data);
		return true;
	},
	[Permission.GetLoc]: async ({data, userId}) => {
		d('getloc', userId, data);
		return false;
	},
};

export const authModule: DomainModule<Repositories> = {
	permissions,
};
