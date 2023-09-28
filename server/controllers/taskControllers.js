const { User, Project, Notification, Task } = require('../models');

const createTask = async (req, res) => {
    try{
        const { title, projectId, description, } = req.body;
        const newTask = await Task.create({
            title,
            description,
            projectId,
            creator: req.user.id
        })
        if(req.body.assignees){
            req.body.assignees.forEach(async (user) => {
                const assignee = await User.findByPk(user);
                await assignee.addTask(newTask);
                await newTask.addUser(assignee);
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
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'color']
            }]
        });
        res.status(200).json(task);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.taskId,
            {
                include: [{
                    model: User,
                    attributes: ['id']
                }]
            });
        if(task){
            if(req.body.newAssignee){
                const newUser = await User.findByPk(req.body.newAssignee);
                await newUser.addTask(task);
                await task.addUser(newUser);
            }
            if(req.body.removeAssignee){
                const oldUser = await User.findByPk(req.body.removeAssignee);
                await oldUser.removeTask(task);
                await task.removeUser(oldUser);
            }
            await task.update(req.body);
            const newTask = await task.reload();
            res.status(200).json(newTask);
        } else{
            res.sendStatus(404);
        }
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const deleteTask = async (req, res) => {
    try{ 
        const oldTask = await Task.destroy({ where: {
            id: req.params.taskId
        } });
        res.status(200).json(oldTask);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createTask, getTask, updateTask, deleteTask }