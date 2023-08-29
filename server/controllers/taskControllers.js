const { User, Project, Notification, Task } = require('../models');

const createTask = async (req, res) => {
    try{
        const newTask = await Task.create(req.body)
        if(req.body.assignees){
            req.body.assignees.forEach(async (user) => {
                const assignee = await User.findByPk(user);
                const updateUser = await assignee.addTask(newTask);
                const updateTask = await newTask.addUser(assignee);
            })
        }
        res.status(200).json(newTask);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const getTask = async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.taskId, {
            include: [User]
        });
        const { id, title, description, creator, status, createdAt, updatedAt, users } = task;
        const assignees = users.map(user => ({ 
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName,
            color: user.dataValues.color
        }))
        res.status(200).json({ id, title, description, createdAt, updatedAt, status, creator, assignees});
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createTask, getTask }