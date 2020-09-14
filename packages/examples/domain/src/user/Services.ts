import type {ServiceInfo} from '@imperium/auth-server';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

@Entity()
export class Services implements Omit<ServiceInfo, 'id'> {
	constructor(servicesLike?: Partial<Services>) {
		Object.assign(this, servicesLike);
		// if (servicesLike) {
		// 	Object.keys(servicesLike).forEach(key => {
		// 		Object.defineProperty(this, key, servicesLike[key]);
		// 	});
		// }
	}

	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	password!: string;

	@Property({type: 'text'})
	roles!: string[];

	@Property({type: 'text', nullable: true})
	blacklist?: string[];
}
