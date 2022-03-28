import {Request, Response} from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import UserQuery from '../Database/queries/UserQuery';
import { checkUserExistWithPhoneNumber } from '../Middlewares/Validators/UserValidator';
import {sendVerificationCodeSMS} from '../Utils/SMS/Kavenegar';
import JWT_handler from '../Utils/Verification/JWT/Jwt';
import ErrorResponse from '../Utils/Response/Response';


class Auth_controller {

    authUser(req: Request, res: Response){
        try {            
            console.log(req.body);
            const phone_number = req.body.phone_number as string;
            checkUserExistWithPhoneNumber(phone_number).then((user)=> {
                if (user === null){
                    return Auth_controller.registerUser(req, res);
                }
                return Auth_controller.loginUser(req, res);
            }).catch((error) => {
                return ErrorResponse.server.internalServerError(res, 'failed to auth user', error);
            })
        }catch(error){
            return ErrorResponse.server.internalServerError(res, 'failed to auth user', error);
        }
    }

    updateUserProfile (req: Request, res: Response) {
        try {
            const image = Auth_controller.uploadImage(req);

            const updateParameters = { ...req.body, 'image': image as string | ''};
            UserQuery.updateUserInformation(updateParameters);

            return res.json({msg: 'upload successfully', status: 200});

        }catch(error){
            return ErrorResponse.server.internalServerError(res, 'upload failed', error);
        }
    }


    private static registerUser (req: Request,res: Response) {
        try {
            const verficationCode = Math.floor(1000 + Math.random() * 9000);
            const params = {...req.body, "verification_code": verficationCode};

            UserQuery.createUser(params).then(record => {
                /* send verification sms */
                // sendVerificationCodeSMS(verficationCode, phoneNumber);
                return res.json({record, msg: "success", status: 201});
            }).catch(error => {
                return ErrorResponse.server.internalServerError(res, 'failed to create new user', error);
            });
        }catch(error){            
            return ErrorResponse.server.internalServerError(res, 'failed to create new user', error);
        };
    }

   async verifyUser(req: Request, res: Response){
        try {
            const phone_number = req.body.phone_number as string;
            const verification_code = req.body.verification_code as number;

            // get original Verify code
            checkUserExistWithPhoneNumber(phone_number).then((userInfo)=> {
                const originalVerficationCode = userInfo?.getDataValue('verification_code');
                if (verification_code == originalVerficationCode){
                    const token = JWT_handler.sign({user_id: userInfo?.getDataValue('id')});
                    return res.json({token: token, msg: "success", status: 200});
                }else {
                    return ErrorResponse.client.badRequest(res, 'invalid verification code');
                }
             }).catch((error) => {
                return ErrorResponse.server.internalServerError(res, 'failed to verify code', error);
            })

       }catch(error){

       }
    }
    private static async loginUser (req: Request,res: Response) {
        
        try {
            const phoneNumber = req.body.phone_number as string;
            const verficationCode = Math.floor(1000 + Math.random() * 9000);
            const record = checkUserExistWithPhoneNumber(phoneNumber);

            if (record != null){
                /* update verification code */
                UserQuery.updateVerificationCode(verficationCode, phoneNumber).then(_ => {
                    /* send verfication code sms */
                    // sendVerificationCodeSMS(verficationCode, phoneNumber)
                    return res.json({msg: "Send the verification code", status: 200});
                }).catch(error => {
                    return ErrorResponse.server.internalServerError(res, 'failed to get data from database', error);
                });
            }else {
                return ErrorResponse.client.badRequest(res, 'there is no user with this inforamtion');
            }
        }catch(error){
            return ErrorResponse.server.internalServerError(res, 'Server failed', error);
        };
    }

    private static uploadImage(req: Request): void | string{
        if ( req.files != null){
            const username = req.body.username;
            console.log(username);
            
            const files = req.files as fileUpload.FileArray;
            
            let sampleFile = files.profile_image as UploadedFile;
            let upload_path: string = __dirname+'/../Uploads/'+ `/${username}/`+sampleFile.name;
    
            console.log(sampleFile.name); 
    
            sampleFile.mv(upload_path,(error: any) => {
                if (error) return Promise.reject(error);
            })
    
            return upload_path
        }
    }
}

export default new Auth_controller();