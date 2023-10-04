const { User, Project, Notification, Task } = require('../models');

const createNotification = async (req, res) => {
    try{
        const recipients = req.body.recipients;
        const notifications = []
        recipients.forEach(async (recip) => {
            const user = await User.findByPk(recip);
            const notification = await Notification.create(req.body);
            if(!user){
                res.status(404).json({ message: 'User not found' });
            } else if(!notification){
                res.status(404).json({ message: 'Something went wrong.' });
            } else{
                notifications.push(notification);
                await user.addNotification(notification);
                await notification.addUser(user);
            }
            
        })
        res.status(200).json(notifications);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const updateNotification = async (req, res) => {
    try{
        const notification = await Notification.findByPk(req.params.id);
        if(!notification){
            res.status(404).json({ message: 'Notification not found.' });
        } else{
            notification.status = req.body.status;
            await notification.save();
            res.status(200).json(notification);
        }
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const deleteNotification = async (req, res) => {
    try{
        const notification = await Notification.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(notification);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createNotification, updateNotification, deleteNotification };