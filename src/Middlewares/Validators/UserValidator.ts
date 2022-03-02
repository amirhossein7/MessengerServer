import { Request, Response, NextFunction } from 'express';
import { body, ValidationChain } from 'express-validator';
import User from '../../Database/models/User';
import UserQuery from '../../Database/queries/UserQuery';


const registerValidation = [
    body('phone_number').notEmpty().withMessage('The phone number cannot be empty!'),
    body('phone_number').isMobilePhone(['fa-IR']).withMessage('The phone number is not valid!'),
    body('username').notEmpty().withMessage('The username cannot be empty!'),
]

const loginValidation = [
    body('phone_number').notEmpty().withMessage('The phone number cannot be empty!'),
    body('phone_number').isMobilePhone(['fa-IR']).withMessage('The phone number is not valid!'),
] 


function checkUserExistWithPhoneNumber(phone_number: string): Promise<User | null> {
    const user = UserQuery.findUserWithPhone(phone_number);
    return user;
}

function checkUserExistWithUsername(username: string): Promise<User | null> {
    const user = UserQuery.findUserWithUsername(username);
    return user;
}

function userExistanceValidation(req: Request, res: Response, next: NextFunction){
    const phone = req.body.phone_number;
    const username = req.body.username;
    
    checkUserExistWithPhoneNumber(phone).then(user => {
        if(user != null){
            return res.json({msg: 'A user exist with this phone number!'});
        }else{
            checkUserExistWithUsername(username).then((user) => {
                if(user != null){
                    return res.json({msg: 'A user exist with this username!'});
                }else {
                    next();
                }
            }).catch(error => {
                return res.json({msg: 'An error occure in check user exsitance with username', error: error});
            })
        }
    }).catch((error) => {
        return res.json({msg: 'An error occure in check user exsitance with phone number', error: error});
    })

}

export {
        registerValidation ,
        loginValidation,
        userExistanceValidation,
        checkUserExistWithPhoneNumber,
        checkUserExistWithUsername
};
