const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        class: {
            type: DataTypes.STRING,
        },
        str1: {
            type: DataTypes.STRING,
        },
        str2: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'notification'
    }
)

module.exports = Notification;