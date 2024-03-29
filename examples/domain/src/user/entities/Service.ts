import type {ServiceInfo} from '@imperium/auth-server';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

@Entity()
export class Service implements Omit<ServiceInfo, 'id'> {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	password!: string;

	@Property({type: 'text'})
	roles!: string[];
}
