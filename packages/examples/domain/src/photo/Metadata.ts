import {Entity, PrimaryKey, Property} from 'mikro-orm';
import {v4} from 'uuid';

@Entity()
export class Metadata {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	location!: string;

	@Property({type: 'text'})
	privateData!: string;
}
