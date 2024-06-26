
export interface IUserQuery {
    createUser(params: any): any;
    findUserWithUsername(username: string): any;
    findUserWithPhone(phone_number: String): any;
    updateVerificationCode(code: number, phoneNumber: string): Promise<void>;
    updateUserInformation(params: any): Promise<any>;
}

export interface IMessageQuery {
    saveMessage(params: any): any;
}