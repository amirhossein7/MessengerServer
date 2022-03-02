import * as Kavenegar from 'kavenegar';
import * as dotenv from 'dotenv';
dotenv.config();

let apikey = process.env.KAVENEGAR_APIKEY as string;
var api = Kavenegar.KavenegarApi({apikey: apikey});

export function sendVerificationCodeSMS(code: string | number, receptor: string){
    const text = `code: ${code}`
    api.Send({message: text, sender: '10008663' ,receptor: receptor} , (res:any)=>{
        console.log("sms :", res);
    });
}