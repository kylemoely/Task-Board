const { User, Project, Notification, Task } = require('../models');

const createProject = async (req, res) => {
    try{
        const newProject = await Project.create(req.body);
        res.status(200).json(newProject);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const getProject = async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.projectId, {
            include: [Task]
        });
        const { tasks, title } = project;
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
        res.status(200).json({ title, toDoTasks, doingTasks, doneTasks });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createProject, getProject };