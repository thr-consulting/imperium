import type {EntityManager} from '@mikro-orm/core';
import type {Connectors} from '@imperium/connector';
import {UserRepository} from '../user/repositories/UserRepository';
import {entities} from './entities';
import {ScoreRepository} from '../score';

export function createRepositories(em: EntityManager, connectors: Connectors) {
	return {
		user: new UserRepository(em.getRepository(entities.User), connectors),
		score: new ScoreRepository(em.getRepository(entities.Score), connectors),
	};
}

export type Repositories = ReturnType<typeof createRepositories>;
