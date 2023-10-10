const { User, Project, Notification, Task } = require('../models');

const createProject = async (req, res) => {
    try{
        const project = await Project.create({
            title: req.body.title,
            creator: req.user.id
        }, {
            include: [{
                model: User
            }]
        });
        const creator = await User.findByPk(req.user.id);
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
            attributes: ['id', 'firstName', 'lastName', 'color']
        }]
        });
        const user = await User.findByPk(req.user.id);
        if(!project.hasUser(user)){
            res.sendStatus(401);
        }
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

const inviteUserToProject = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.sendStatus(404);
        }
        const project = await Project.findByPk(req.params.projectId);
        project.invitedUsers.push(user.id);
        await project.save();
        res.status(200).json([project, user.id]);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const deleteProject = async (req, res) => {
    try{
        const project = await Project.destroy({ where: { id: req.params.projectId } });
        res.status(200).json(project);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createProject, getProject, updateProject, deleteProject, inviteUserToProject };