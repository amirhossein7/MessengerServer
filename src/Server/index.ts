require('dotenv').config();
import express from 'express';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import runDatabase from "../Database/config/execute";
import MainRouter from '../Routes/routes';
import Socket from '../Utils/Socket/Index';
import { createServer } from 'http';
import {runRedis} from '../Utils/Storage/Redis/Index'
import { exit } from 'process';

const port = process.env.SERVER_PORT;
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true})); 

app.use('/', MainRouter.router);


const httpServer = createServer(app);
function runServer(){
    new Socket(httpServer);
    httpServer.listen(port, () => {
        console.log(`Server running on port: `,port);  
    })
}

export default function fire(){
    runRedis(); 
    runDatabase();
    runServer();
}


