import Redis from "./Redis";

const redis = new Redis();

export function runRedis() {
    redis.run();
}

const client = redis.client;

export function save(key: any, value: any) {
    client.set(key, value);
}

export function get(key: any): Promise<any> {
    return client.get(key);
}

export function checkUserConnected(user_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
        get(user_id).then((data) => {
            if (data != null) {
                resolve(data);
            }else {
                reject();
            }
        }).catch( _ => {
            reject();
        })
    })

}