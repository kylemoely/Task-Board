const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async (req, res) => {
    try{
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        .catch((err) => {
            res.status(400).json(err);
        })
        if(newUser){
            res.status(200).json(newUser);
        } else{
            res.status(400).json('Something went wrong. Please try again.');
        }
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try{
        const checkUser = await User.findOne({ 
            where: { email: req.body.email }
        })
        if(checkUser){
            const check = await checkUser.checkPassword(req.body.password);
            if(check){
                const user = { 
                    id: checkUser.id,
                    email: checkUser.email,
                    firstName: checkUser.firstName,
                    lastName: checkUser.lastName
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                checkUser.refreshToken = refreshToken;
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

module.exports =   { login, signUp };