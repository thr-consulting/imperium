import { ImperiumConnectors, IImperiumServer } from '@imperium/server';
import { Connection } from 'typeorm';
import redis from 'redis';
import Mongoose from 'mongoose';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export default class Connectors implements ImperiumConnectors {
    _postgresConnection?: Connection;
    _redisClient?: redis.RedisClient;
    _mongoose?: typeof Mongoose;
    _pubsub?: RedisPubSub;
    private createTypeORM;
    private createRedis;
    private createMongoose;
    private createPubsub;
    create(server: IImperiumServer): Promise<{
        redis: any;
        mongoose: typeof Mongoose;
        mongo: import("mongodb").Db | null;
        pubsub: RedisPubSub;
    }>;
    close(): Promise<void>;
}
