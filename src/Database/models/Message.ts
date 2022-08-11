'use strict'
import db from "../config/database.config";
import { Model, DataTypes, UUIDV4  } from "sequelize";


interface IMessage {
    _id: string,
    replay_id: string,
    from: string,
    to: string,
    content: string,
    create_at: Date,
    update_at: Date
}

export default class Message extends Model<IMessage> {};

Message.init(
    {
        _id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4
        },
        replay_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
            defaultValue: Date,
            allowNull: false
        },
        update_at: {
            type: DataTypes.DATE,
            defaultValue: Date,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'Message'
    }
);