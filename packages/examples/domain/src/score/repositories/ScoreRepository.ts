import {AbstractRepository} from '@imperium/domaindriven';
import type {Connectors} from '@imperium/connector';
import type {EntityRepository} from '@mikro-orm/core';
import type {Score} from '../entities/Score';

export class ScoreRepository extends AbstractRepository<Score> {
	public constructor(repo: EntityRepository<Score>, connectors: Connectors) {
		super(repo, connectors);
	}
}
