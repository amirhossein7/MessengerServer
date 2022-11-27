import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


const secret_key = process.env.JWT_SECRETKEY as jwt.Secret;

const expiration_time: string = "3d";

class JWT_handler {

    
    /**
     * Sign data with system secret key
     *  */ 
    static sign(object: object, expiration: string = expiration_time): string {
        return jwt.sign(object, secret_key, {expiresIn: expiration})
    }

    /**
     * Verfiying tocken 
     *  */ 
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
