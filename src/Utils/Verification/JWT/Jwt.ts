import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


const secret_key = process.env.JWT_SECRETKEY as jwt.Secret;

class JWT_handler {

    
    /// create token
    static sign(object: object, expiration: string = "3d"): string {
        return jwt.sign(object, secret_key, {expiresIn: expiration})
    }

    /// verify JWT
    static verify(token: string): Promise<any> {
        const result = this.splitToken(token);
        return new Promise((resolve, reject) => {
            jwt.verify(result, secret_key, (error, decoded: any) => {
                if (error){
                    reject(error.message);
                }
                else {
                    resolve(decoded);
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
