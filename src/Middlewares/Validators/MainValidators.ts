import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import JWT_handler from '../../Utils/Verification/JWT/Jwt';

class ValidatorMiddleware {

    userRequestValidation(req: Request, res: Response, next: NextFunction){                
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.json(error);
        }
        next();
    }

    jwtValidation (req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
            JWT_handler.verify(bearerHeader).then((payload) => {
                next(payload);
            }).catch(_ => {
                // Forbidden
                res.sendStatus(403);
            });
        }else {
            // Forbidden
            res.sendStatus(403);
        }
    }
}


export default new ValidatorMiddleware();

