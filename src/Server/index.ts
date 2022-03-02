require('dotenv').config();
import express from 'express';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import runDatabase from "../Database/config/execute";
import MainRouter from '../Routes/routes';


const port = process.env.SERVER_PORT;
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true})); 

app.use('/', MainRouter.router);

function runServer(){
    app.listen(port, () => {
        console.log(`Server running on port: `,port);  
    })
}

export default function fire(){
    runDatabase(runServer);
}


