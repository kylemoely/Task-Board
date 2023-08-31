const { User, Project, Notification, Task } = require('../models');

const createProject = async (req, res) => {
    try{
        const project = await Project.create(req.body, {
            include: [{
                model: User
            }]
        });
        const creator = await User.findByPk(req.body.creator);
        await creator.addProject(project);
        await project.addUser(creator);
        const newProject = await project.reload();
        res.status(200).json(newProject);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const getProject = async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.projectId, {
            include: [{
                model: Task,
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'color']
                }]
            },
        {
            model: User,
            attributes: ['id']
        }]
        });
        const { tasks, title, users } = project;
        const toDoTasks = [];
        const doingTasks = [];
        const doneTasks = [];
        tasks.forEach((task) => {
            switch(task.dataValues.status){
                case 0:
                    toDoTasks.push(task);
                    break;
                case 1:
                    doingTasks.push(task);
                    break;
                case 2:
                    doneTasks.push(task);
                    break;
            }
        })
        res.status(200).json({ title, users, toDoTasks, doingTasks, doneTasks });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const updateProject = async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.projectId);
        await project.update(req.body);
        const newProject = await project.reload();
        res.status(200).json(newProject);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createProject, getProject, updateProject };