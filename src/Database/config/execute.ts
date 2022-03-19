import { exit } from "process";
import db from "./database.config";

export default function runDatabase(){
    db.sync().then(() => {
        console.log(`database connected ...`);
    }).catch((error: any) => {
        console.log(`db failed!!! \n${error}`);
        exit(0);
    })
}
