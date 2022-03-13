import { Router } from "express";
import MainController from '../Controllers/Index';
import Auth_controller from "../Controllers/RegisterLogin";
import {registerValidation,
        authenticationValidation,
        userExistanceValidation,
        } from '../Middlewares/Validators/UserValidator';
import ValidatorMiddleware from "../Middlewares/Validators/MainValidators";

class MainRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.configuration();
    }

    private configuration() {
        this.router.get('', MainController.index)
        this.router.post('/authentication',
                            authenticationValidation,
                            ValidatorMiddleware.userRequestValidation,
                            Auth_controller.authUser);
        // this.router.post('/register',
        //                     registerValidation,
        //                     ValidatorMiddleware.userRequestValidation,
        //                     userExistanceValidation,
        //                     Auth_controller.registerUser
        //                 );
        this.router.post('/verificationCode',
                            ValidatorMiddleware.userRequestValidation,
                            Auth_controller.verifyUser
                        );
        // this.router.post('/login',
        //                     authenticationValidation,
        //                     ValidatorMiddleware.userRequestValidation,
        //                     Auth_controller.loginUser);
        this.router.post('/updateUserProfile',
                            // authenticationValidation,
                            // ValidatorMiddleware.userRequestValidation,
                            Auth_controller.updateUserProfile
                        );
    }
}

export default new MainRouter;