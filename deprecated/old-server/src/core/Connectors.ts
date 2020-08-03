import {ImperiumConnectors, IImperiumServer} from '@imperium/server';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import redis from 'redis';
import Mongoose, {connect} from 'mongoose';
import {RedisPubSub} from 'graphql-redis-subscriptions';
import SharedCache from '@thx/sharedcache';
import {gatherEntities, gatherSubscribers} from '@imperium/typeorm';

export default class Connectors implements ImperiumConnectors {
	_postgresConnection?: Connection;
	_redisClient?: redis.RedisClient;
	_mongoose?: typeof Mongoose;
	_pubsub?: RedisPubSub;
	_sharedCache?: SharedCache;

	private async createTypeORM(server: IImperiumServer) {
		const entities = gatherEntities(server);
		const subscribers = gatherSubscribers(server);

		const postgresOptions: ConnectionOptions = {
			type: 'postgres',
			url: process.env.POSTGRESQL_URL,
			synchronize: !!server.environment.development, // dev only
			entities,
			subscribers,
			...(process.env.POSTGRESQL_SSL_CA ? {ssl: {ca: process.env.POSTGRESQL_SSL_CA}} : {}),
		};

		this._postgresConnection = await createConnection(postgresOptions);

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

	private createSharedCache() {
		if (!this._redisClient) throw new Error('Redis not created');
		this._sharedCache = new SharedCache({
			redis: this._redisClient,
			prefix: 'imp',
		});
		return this._sharedCache;
	}

	async create(server: IImperiumServer) {
		// Order matters here as some connections rely on others.
		return {
			pg: await this.createTypeORM(server),
			redis: this.createRedis(),
			mongoose: await this.createMongoose(),
			mongo: this._mongoose ? this._mongoose.connection.db : null,
			pubsub: this.createPubsub(),
			sharedCache: this.createSharedCache(),
		};
	}

	async close() {
		if (this._postgresConnection) await this._postgresConnection.close();
	}
}
