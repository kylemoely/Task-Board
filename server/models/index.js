const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Notification = require('./Notification');
const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

Project.hasMany(Task, {
    foreignKey: 'projectId'
});
Task.belongsTo(Project);

const UserProjects = sequelize.define('UserProjects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false }},
        { timestamps: false });

User.belongsToMany(Project, { through: UserProjects });
Project.belongsToMany(User, { through: UserProjects });

const UserTasks = sequelize.define('UserTasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false }},
        { timestamps: false });


User.belongsToMany(Task, { through: UserTasks });
Task.belongsToMany(User, { through: UserTasks });

const UserNotifications = sequelize.define('UserNotifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false }},
        { timestamps: false });

User.belongsToMany(Notification, { through: UserNotifications });
Notification.belongsToMany(User, { through: UserNotifications });

module.exports = { User, Project, Task, Notification };