import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host":     process.env.MYSQL_HOSTNAME,
    "dialect":  process.env.MYSQL_DIALECT,
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host":     process.env.MYSQL_HOSTNAME,
    "dialect":  process.env.MYSQL_DIALECT,
    "logging": false
  }
}



export default dbConfig;