import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { IUserQuery } from '../../Database/Interfaces/Index';
import User from '../../Database/models/User';
import ErrorResponse from '../../Utils/Response/Response';


class UserValidatior {

    private userQuery: IUserQuery;

    constructor(userQuery: IUserQuery){
        this.userQuery = userQuery;
    }

    static registerValidation = [
        body('phone_number').notEmpty().withMessage('The phone number cannot be empty!'),
        body('phone_number').isMobilePhone(['fa-IR']).withMessage('The phone number is not valid!'),
        body('username').notEmpty().withMessage('The username cannot be empty!'),
    ]
    
    static authenticationValidation = [
        body('phone_number').notEmpty().withMessage('The phone number cannot be empty!'),
        body('phone_number').isMobilePhone(['fa-IR']).withMessage('The phone number is not valid!'),
    ] 



    checkUserExistWithPhoneNumber = (phone_number: string):  Promise<User | null> => {
        return this.userQuery.findUserWithPhone(phone_number);
    }

    checkUserExistWithUsername = (username: string): Promise<User | null> => {
        return this.userQuery.findUserWithUsername(username);
    }

    userExistanceValidation = (req: Request, res: Response, next: NextFunction) => {
        const phone = req.body.phone_number;
        const username = req.body.username;
        
        this.checkUserExistWithPhoneNumber(phone).then(user => {
            if(user != null){
                return ErrorResponse.client.conflict(res,'A user exist with this phone number!');
            }else{
                this.checkUserExistWithUsername(username).then((user) => {
                    if(user != null){
                        return ErrorResponse.client.conflict(res, 'A user exist with this username!')
                    }else {
                        next();
                    }
                }).catch(error => {
                    return ErrorResponse.server.internalServerError(res, 'An error occure in check user exsitance with username', error);
                })
            }
        }).catch((error) => {
            return ErrorResponse.server.internalServerError(res, 'An error occure in check user exsitance with phone number', error)
        })
    }

}

export default UserValidatior;