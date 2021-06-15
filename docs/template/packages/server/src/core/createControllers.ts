import type {EntityManager} from '@mikro-orm/core';
import type {TemplateAuthorization} from '~core/./TemplateAuthorization';
import type {Repositories} from '~core/createRepositories';
import {SampleController} from '../sample/controllers';

export function createControllers(em: EntityManager, authorization: TemplateAuthorization, repositories: Repositories) {
	return {
		sample: new SampleController(repositories, em, authorization),
	};
}
