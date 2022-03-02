import { Router } from "express";
import MainController from '../Controllers/index';
import CURD_controller from "../Controllers/CURD";
import {registerValidation,
        loginValidation,
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
        this.router.post('/register',
                            registerValidation,
                            ValidatorMiddleware.userRequestValidation,
                            userExistanceValidation,
                            CURD_controller.registerUser
                        );
        this.router.post('/verificationCode',
                            ValidatorMiddleware.userRequestValidation,
                            CURD_controller.verifyUser
                        );
        this.router.post('/login',
                            loginValidation,
                            ValidatorMiddleware.userRequestValidation,
                            CURD_controller.loginUser);
        this.router.post('/uploadProfileImage',
                            ValidatorMiddleware.userRequestValidation,
                            CURD_controller.uploadProfileImage
                        );
    }
}

export default new MainRouter;