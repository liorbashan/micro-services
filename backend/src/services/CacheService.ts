import { ICacheService } from './../interfaces/ICacheService';
import { createHandyClient, IHandyRedis } from 'handy-redis';
import Container, { Service } from 'typedi';

@Service()
export class CacheService implements ICacheService {
    public client: IHandyRedis;
    public redisOptions: any = {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB,
    };
    constructor() {
        this.client = createHandyClient(this.redisOptions);
        this.client.redis.on('error', (error) => {
            console.log('Error, CacheService ', error);
            this.client.redis.end(true);
            Container.remove(CacheService);
        });
    }
    public async getValue(key: string): Promise<any> {
        console.log(`Attempting to get value from cache for key: ${key}`);
        let result: any = undefined;
        result = await this.client.get(key).catch((error) => {
            console.log('ERROR, CacheService.getValue', error);
            throw error;
        });
        if (!result) {
            console.log(`Cache - key: ${key} returned no value`);
        } else {
            result = JSON.parse(result);
        }
        return result;
    }
    public async setValue(key: string, val: any, ttl?: number | undefined): Promise<void> {
        console.log(`Attempting to cache key: ${key}`);
        await this.client.set(key, val).catch((error) => {
            console.log('ERROR, CacheService.setValue', error);
            throw error;
        });
        if (ttl) {
            this.client.expire(key, ttl);
        }
    }
    public isConnected(): boolean {
        const connected = this.client.redis.connected;
        if (connected) {
            console.log('Redis connected!');
        } else {
            console.log('Redis is not connected!');
        }
        return connected;
    }
}
