import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { rejects } from 'assert';
dotenv.config();


const secret_key = process.env.JWT_SECRETKEY as jwt.Secret;

class JWT_handler {

    
    /// create token
    static sign(object: object, expiration: string = "30s"): string {
        return jwt.sign(object, secret_key, {expiresIn: expiration})
    }

    /// verify JWT
    static verify(token: string): Promise<object> {
        const result = this.splitToken(token);
        return new Promise((resolve, reject) => {
            jwt.verify(result, secret_key, (error, decoded: any) => {
                if (error){
                    reject(error.message);
                }
                else {
                    resolve(decoded as object);
                }
            });
        })

    }


    private static splitToken(data: string): string {
        // Split at the space
        return data.split(' ')[1];
    }

}


export default JWT_handler;
