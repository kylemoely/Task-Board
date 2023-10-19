const { User, Project, Notification, Task } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        if(newUser){
            res.status(200).json(newUser);
        } else{
            res.sendStatus(400);
        }
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try{
        const checkUser = await User.findOne({ 
            where: { email: req.body.email },
            include: [Project]
        },)
        if(checkUser){
            const check = checkUser.checkPassword(req.body.password);
            if(check){
                const user = { 
                    id: checkUser.id,
                    email: checkUser.email,
                    firstName: checkUser.firstName,
                    lastName: checkUser.lastName,
                    color: checkUser.color,
                    projects: checkUser.projects
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                checkUser.refreshToken = refreshToken;
                await checkUser.save();
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None', maxAge: 24 * 60 * 60 * 1000
                });
                return res.status(200).json({ accessToken, user });
            } else{
                return res.status(400).json({ message: 'Incorrect email or password' });
            }
        } else{
             return res.status(400).json({ message: 'Incorrect email or password' });
        }
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
    
};

const getUsers = async (req, res) => {
    try{
        const users = await User.findAll({ attributes: ['email']});
        const emails = users.map(user => user.email);
        res.status(200).json(emails);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(200);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({
        where: { refreshToken: refreshToken }
    });

    if(!user){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(200);
    }

    user.refreshToken = '';
    await user.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200);
}

const getUserData = async (req, res) => {
    try{
        const user = await User.findByPk(req.user.id, {
            include: [
                {
                    model: Project
                },
                {
                    model: Task,
                    include: [Project, User]
                },
                {
                    model: Notification
                }
            ]
        });
        if(user){
            res.status(200).json({
                projects: user.projects,
                notifications: user.notifications,
                tasks: user.tasks
            });
        } else{
            res.sendStatus(403);
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports =   { login, signUp, getUserData, logout, getUsers };