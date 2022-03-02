import { IUserQuery } from "../Interfaces";
import User from "../models/User";

class UserQuery implements IUserQuery {

    async createUser(params: any): Promise<User>{
        return await User.create(params);
    }

    async findUserWithUsername(username: string): Promise<User | null> {
        return await User.findOne({where: {username: username}});
    }

    async findUserWithPhone(phone_number: string): Promise<User | null> {
        return await User.findOne({where: {phone_number: phone_number}}); 
    }

    async updateVerificationCode(code: number, phoneNumber: string): Promise<any> {
        User.update(
            { verification_code: code },
            { where: { phone_number: phoneNumber } }).then(_ => {
                return Promise.resolve();
            }).catch(error => {
                return Promise.reject(error);
            });
    }

}

export default new UserQuery();