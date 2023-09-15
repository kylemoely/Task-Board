const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
    {
        id: {
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                len:[0,30]
            }
        },
        creator: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newProjectData){
                const words = newProjectData.title.split(' ');
                words.forEach(function(word, i){ this[i]=word[0].toUpperCase() + word.substring(1) }, words);
                newProjectData.title = words.join(' ');
                return newProjectData;
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'project'
    }
)

module.exports = Project;