const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Notification = require('./Notification');

Project.hasMany(Task, {
    foreignKey: 'projectId'
});
Task.belongsTo(Project);

User.belongsToMany(Project, { through: 'UserProjects' });
Project.belongsToMany(User, { through: 'UserProjects' });

User.belongsToMany(Task, { through: 'UserTasks' });
Task.belongsToMany(User, { through: 'UserTasks' });

User.belongsToMany(Notification, { through: 'UserNotifications' });
Notification.belongsToMany(User, { through: 'UserNotifications' });

module.exports = { User, Project, Task, Notification };