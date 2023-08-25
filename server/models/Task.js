const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model{}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [0,60]
            }
        },
        description: {
            type: DataTypes.STRING,
        },
        creator: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.TEXT('tiny'),
            defaultValue: 'To Do'
        },
        projectId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'task'
    }
)

module.exports = Task;