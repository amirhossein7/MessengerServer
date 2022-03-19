// const redis = require('redis');
import * as redis from'redis';
import * as dotenv from 'dotenv';
import { RedisClientOptions } from 'redis';
import { RedisClientType } from '@node-redis/client';
import { exit } from 'process';
dotenv.config();


export default class Redis {

    client: RedisClientType;
    
    constructor(){
        this.client = redis.createClient({
            host: `${process.env.REDIS_HOST}`,
            port: process.env.REDIS_PORT
        } as RedisClientOptions); 
    }

    run(){
        this.client.on('connect', () => console.log('redis connected ...'));
        this.client.on('error', (err: any) => {
            console.log('Redis Client Error', err);
            exit(0);
        });
        this.client.connect();
    }
}
