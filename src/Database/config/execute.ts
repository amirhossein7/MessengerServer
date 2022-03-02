import db from "./database.config";

export default function runDatabase(next: () => any){
    db.sync().then(() => {
        console.log(`database connected ...`);
        next();
    }).catch((error: any) => {
        console.log(`db failed!!! \n${error}`);
    })
}
