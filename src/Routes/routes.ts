import { Router } from "express";
import MainController from '../Controllers/Index';
import Auth_controller from "../Controllers/RegisterLogin";
import { authenticationValidation } from '../Middlewares/Validators/UserValidator';
import ValidatorMiddleware from "../Middlewares/Validators/MainValidators";
import MainValidators from "../Middlewares/Validators/MainValidators";
import UserQuery from '../Database/queries/UserQuery';


class MainRouter {

    public router: Router;
    private auth_controller: Auth_controller = new Auth_controller(UserQuery);

    constructor() {
        this.router = Router();
        this.configuration();
    }

    private configuration() {
        this.router.get('', 
                            // MainValidators.jwtValidation,
                            MainController.index
                        );

        this.router.get('/1',
                            MainController.index1
                        );

        this.router.post('/authentication',
                            authenticationValidation,
                            ValidatorMiddleware.userRequestValidation,
                            // MainValidators.jwtValidation,
                            this.auth_controller.authUser
                        );

        this.router.post('/verificationCode',
                            ValidatorMiddleware.userRequestValidation,
                            this.auth_controller.verifyUser
                        );

        this.router.post('/updateUserProfile',
                            // authenticationValidation,
                            // ValidatorMiddleware.userRequestValidation,
                            this.auth_controller.updateUserProfile
                        );
    }
}

export default new MainRouter;