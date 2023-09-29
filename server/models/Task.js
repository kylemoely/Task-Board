const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model{}

Task.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
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
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        projectId: {
            type: DataTypes.UUID,
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