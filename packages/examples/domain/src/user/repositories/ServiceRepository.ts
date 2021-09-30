import {AbstractRepository} from '@imperium/domaindriven';
import type {Collection} from '@mikro-orm/core';
import debug from 'debug';
import type {Service} from '../entities/Service';

const d = debug('imperium.examples.examples/domain.user.repositories.ServiceRepository');

export class ServiceRepository extends AbstractRepository<Service> {
	initializeCollection(service: Collection<Service>) {
		return super.initializeCollection(service);
	}

	initializeEntity(service: Service) {
		return super.initializeEntity(service);
	}
}
