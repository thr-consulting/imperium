import debug from 'debug';
import faker from 'faker';

const d = debug('imperium.examples.domain-advanced.User');

class User {
	public readonly id: string;
	public readonly name: string;

	constructor(id: string) {
		this.id = id;
		this.name = faker.name.findName();
	}

	static async authGetById(id: string) {
		return new User(id);
	}
}

export {User};
