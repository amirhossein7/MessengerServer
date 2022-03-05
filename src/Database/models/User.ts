'use strict';
import db from "../config/database.config";
import { Model, DataTypes, UUIDV4  } from "sequelize";
import { verificatioExpiration } from "../../Tools/Verification";


interface IUser {
  id: string
  username: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  verification_code: number,
  verification_code_expiration: string
  description: string,
  image: string,
  last_seen: Date
}


export default class User extends Model<IUser>{}


User.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verification_code: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        verification_code_expiration: {
            type: DataTypes.STRING,
            defaultValue: verificatioExpiration() ,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_seen: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
            allowNull: true
        }

    },
    {
        sequelize: db,
        modelName: 'User',
    }
);


