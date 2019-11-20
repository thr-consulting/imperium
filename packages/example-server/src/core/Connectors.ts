import {ImperiumConnectors, IImperiumServer} from '@imperium/server';
import {Connection, createConnection} from 'typeorm';
import redis from 'redis';
import Mongoose, {connect} from 'mongoose';
import {RedisPubSub} from 'graphql-redis-subscriptions';

export default class Connectors implements ImperiumConnectors {
	_postgresConnection?: Connection;
	_redisClient?: redis.RedisClient;
	_mongoose?: typeof Mongoose;
	_pubsub?: RedisPubSub;

	private async createTypeORM(server: IImperiumServer) {
		// This gets all the entities from all of my modules.
		const entities = server.modules.reduce((memo, module) => {
			if (module.entities && module.entities instanceof Function) {
				return [...memo, ...module.entities()];
			}
			return memo;
		}, []);
		const subscribers = server.modules.reduce((memo, module) => {
			if (module.subscribers && module.subscriber instanceof Function) {
				return [...memo, ...module.subscribers()];
			}
			return memo;
		}, []);

		this._postgresConnection = await createConnection({
			type: 'postgres',
			url: process.env.POSTGRESQL_URL,
			synchronize: true, // dev only
			entities,
			subscribers,
		});

		return this._postgresConnection;
	}

	private createRedis() {
		this._redisClient = redis.createClient({
			host: process.env.REDIS_HOST,
			port: parseInt(process.env.REDIS_PORT || '6379', 10),
			db: parseInt(process.env.REDIS_DB || '0', 10),
		});

		return this._redisClient;
	}

	private async createMongoose() {
		this._mongoose = await connect(process.env.MONGO_URL || '', {useNewUrlParser: true, useUnifiedTopology: true});
		return this._mongoose;
	}

	private createPubsub() {
		this._pubsub = new RedisPubSub({
			connection: {
				host: process.env.REDIS_HOST,
				port: parseInt(process.env.REDIS_PORT || '6379', 10),
				db: parseInt(process.env.REDIS_DB || '0', 10),
			},
		});
		return this._pubsub;
	}

	async create(server: IImperiumServer) {
		// Order matters here as some connections rely on others.
		return {
			// pg: await this.createTypeORM(server),
			redis: this.createRedis(),
			mongoose: await this.createMongoose(),
			mongo: this._mongoose ? this._mongoose.connection.db : null,
			pubsub: this.createPubsub(),
		};
	}

	async close() {
		if (this._postgresConnection) await this._postgresConnection.close();
	}
}
