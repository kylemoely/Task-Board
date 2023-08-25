const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            }
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/
            }
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        projects: {
            type: DataTypes.JSON
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                newUserData.firstName = newUserData.firstName.charAt(0).toUpperCase() + newUserData.firstName.slice(1);
                newUserData.lastName = newUserData.lastName.charAt(0).toUpperCase() + newUserData.lastName.slice(1);
                return newUserData;
            }
        },
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:false,
        modelName: 'user'
    }
);

module.exports = User;