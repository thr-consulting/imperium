import {MongoClient} from 'mongodb';
import MongodbMemoryServer from 'mongodb-memory-server';

export async function mongoSetup() {
	const mongod = new MongodbMemoryServer();
	const port = await mongod.getPort();
	const dbName = await mongod.getDbName();
	const mongoConn = await MongoClient.connect(`mongodb://localhost:${port}`, {
		useNewUrlParser: true,
	});
	const db = await mongoConn.db(dbName);

	return {
		mongod,
		mongoConn,
		db,
	};
}

export async function mongoTeardown(mongo) {
	await mongo.mongoConn.close();
	mongo.mongod.stop();
}
