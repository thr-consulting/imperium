import {Column} from 'typeorm';

export class Metadata {
	@Column('text')
	location!: string;

	@Column('text')
	privateData!: string;
}
