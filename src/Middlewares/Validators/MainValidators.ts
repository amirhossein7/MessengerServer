import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import JWT_handler from '../../Utils/Verification/JWT/Jwt';
import ErrorResponse from '../../Utils/Response/Response';

class ValidatorMiddleware {

    userRequestValidation(req: Request, res: Response, next: NextFunction){                
        const error = validationResult(req);
        if (!error.isEmpty()){             
            return ErrorResponse.client.badRequest(res, null, error.array({onlyFirstError: true}));
        }
        next();
    }

    jwtValidation (req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
            JWT_handler.verify(bearerHeader).then((payload) => {
                req.body.userInfo = payload;
                next();
            }).catch(_ => {
                return ErrorResponse.client.badRequest(res); 
            });
        }else {
            return ErrorResponse.client.unAuthorized(res);

        }
    }
}


export default new ValidatorMiddleware();
