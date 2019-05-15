/* eslint-disable global-require, no-underscore-dangle */
import Context from '@imperium/core/src/server/middleware/Context';
import {mongoSetup, mongoTeardown} from '../../../../../tests/mongo';
import Auth, {validatePassword} from './Auth';
import * as randomId from './randomId';

// Allow for mongo-memory-db to startup
jest.setTimeout(60000);

// Mock randomId
jest.spyOn(randomId, 'default').mockReturnValue('1a2b3c');

// Module global variable for mongo connection
let mongo;

// Before all tests
beforeAll(async () => {
	mongo = await mongoSetup();
});

// After all tests
afterAll(async () => {
	await mongoTeardown(mongo);
});

// Context
const ctx = new Context();

describe('Auth', () => {
	it('should create a role', async () => {
		const auth = new Auth(mongo.db, ctx);
		await auth.createRole('sysadmin', ['SYSADMIN']);

		// Test against the underlying database
		const roles = await mongo.db.collection('roles');
		const res = await roles.find().toArray();
		expect(res).toMatchSnapshot();
	});

	it('should retrieve a role', async () => {
		const auth = new Auth(mongo.db, ctx);
		const res = await auth.getByName('sysadmin');
		expect(res).toMatchSnapshot();
	});

	it('should retrieve a role\'s permissions', async () => {
		const auth = new Auth(mongo.db, ctx);
		const res = await auth.getPermissions(['sysadmin']);
		expect(res).toMatchSnapshot();
	});

	it('should encrypt and validate a password', async () => {
		const auth = new Auth(mongo.db, ctx);
		const samplepassword = 'samplepassword';
		const enc = await auth.encryptPassword(samplepassword);
		const res = await validatePassword({services: {password: {bcrypt: enc}}}, samplepassword);
		expect(res).toBe(true);
	});

	// it('should generate a jwt', async () => {
	// 	const auth = new Auth(mongo.db, ctx);
	// 	const jwt = await auth.generateJwt({data: 'data'});
	// 	expect(jwt).toMatchSnapshot();
	// });
});
