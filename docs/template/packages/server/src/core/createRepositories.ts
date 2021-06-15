import type {Connectors} from '@imperium/connector';
import type {EntityManager} from '@mikro-orm/core';
import {entities} from '~core/entities';
import {SampleRepository} from '../sample/repositories';
import {UserRepository} from '../user/repositories';

export function createRepositories(em: EntityManager, connectors: Connectors) {
	return {
		sample: new SampleRepository(em.getRepository(entities.Sample), connectors),
		user: new UserRepository(em.getRepository(entities.User), connectors),
	};
}

export type Repositories = ReturnType<typeof createRepositories>;
