
export interface IUserQuery {
    createUser(params: any): any;
    findUserWithUsername(username: string): any;
    findUserWithPhone(phone_number: String): any;
    updateVerificationCode(code: number, phoneNumber: string): Promise<void>;
}

export interface IMessageQuery {
    saveMessage(params: any): any;
}