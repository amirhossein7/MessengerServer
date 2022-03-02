import {Request, Response} from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import UserQuery from '../Database/queries/UserQuery';
import { checkUserExistWithPhoneNumber } from '../Middlewares/Validators/UserValidator';
import {sendVerificationCodeSMS} from '../Tools/SMS/Kavenegar';


class CURD_controller {
    registerUser (req: Request,res: Response) {
        try {
            const verficationCode = Math.floor(1000 + Math.random() * 9000);
            const params = {...req.body, "verification_code": verficationCode};

            UserQuery.createUser(params).then(record => {
                return res.json({record, msg: "success", status: 201});
            }).catch(error => {
                return res.json({msg: 'failed to create new user', error: error, status: 500, route: '/register'}).end(500);
            });
        }catch(error){            
            return res.json({msg: 'failed to create new user', error: error, status: 500, route: '/register'}).end(500);
        };
    }

   async verifyUser(req: Request, res: Response){
        try {
            const phone_number = req.body.phone_number as string;
            const verification_code = req.body.verification_code as number;

            let record = checkUserExistWithPhoneNumber(phone_number);
            // get original Verify code
            record.then((userInfo)=> {
                const originalVerficationCode = userInfo?.getDataValue('verification_code');
                return res.json({record, msg: "success", status: 200});
            }).catch((error) => {
                return res.json({record, msg: `failed to verify code, reason: ${error}`, status: 500});
            })

       }catch(error){

       }
    }
    async loginUser (req: Request,res: Response) {
        try {
            const phoneNumber = req.body.phone_number as string;
            const verficationCode = Math.floor(1000 + Math.random() * 9000);
            const record = checkUserExistWithPhoneNumber(phoneNumber);

            if (record != null){
                // update verification code
                UserQuery.updateVerificationCode(verficationCode, phoneNumber).then(_ => {
                    // send verfication code sms;
                    sendVerificationCodeSMS(verficationCode, phoneNumber)
                    return res.json({msg: "Send the verification code", status: 200});
                }).catch(error => {
                    return res.json({record, msg: `error in database: ${error}`, status: 500});
                });
            }else {
                return res.json({record, msg: "there is no user with this inforamtion", status: 404});
            }
        }catch(error){
            return res.json({msg: `failed to get login user \n ${error}`, status: 500, route: '/login'}).end(500);
        };
    }

    async uploadProfileImage (req: Request, res: Response) {

        try {

            const username = req.query.username;
            console.log(username);
            
            const files = req.files as fileUpload.FileArray;
            
            let sampleFile = files.profile_image as UploadedFile;
            let upload_path: string = __dirname+'/../Uploads/'+ `/${username}/`+sampleFile.name;
    
            console.log(sampleFile.name); 

            sampleFile.mv(upload_path,(error: any) => {
                if (error) return res.json({msg: error}).end(500);
                return res.json({msg: 'profile updated', status: 200});
            })

            // User.update(
            //     {image: upload_path},
            //     {where: req.body.username}
            //     ).then((rowUpdated: any) => {
            //         console.log('~~~~~> ', rowUpdated);
                    
            //     })
        }catch(error){
            return res.json({msg: 'upload failed', reason: error}).end(500);
        }
    }
}

export default new CURD_controller();