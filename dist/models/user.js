'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    User.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: types_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
