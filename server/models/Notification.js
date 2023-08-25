const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.TEXT('tiny'),
            defaultValue: 'unread'
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