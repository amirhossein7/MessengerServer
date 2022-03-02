import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import dbConfig from './config';


const db = new Sequelize(dbConfig["development"] as any);


export default db;
