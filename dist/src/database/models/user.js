'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../config/database.config"));
const sequelize_1 = require("sequelize");
const Verification_1 = require("../../Utils/Verification");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    verification_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    verification_code_expiration: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: (0, Verification_1.verificatioExpiration)(),
        allowNull: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    last_activate_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: Date.now,
        allowNull: true
    },
    // user_state: {
    //     type: DataTypes.NUMBER,
    //     defaultValue: 0,
    //     allowNull: true
    // }
}, {
    sequelize: database_config_1.default,
    modelName: 'User',
});
