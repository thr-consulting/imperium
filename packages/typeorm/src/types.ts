import {EntitySchema} from 'typeorm';

export interface ImperiumTypeormServerModule {
	entities?: () => (string | Function | EntitySchema<any>)[];
	subscribers?: () => (string | Function)[];
}
