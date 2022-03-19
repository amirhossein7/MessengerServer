import Redis from "./Redis";

const redis = new Redis();

export function runRedis() {
    redis.run();
}

export const client = redis.client;

