const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
    try{
        const checkUser = await User.findOne({ where: { email: req.body.email } })
        .catch((err) => {
            res.status(400).json(err);
        });
        if(checkUser){
            const check = await checkUser.checkPassword(req.body.password);
            if(check){
                res.status(200).json(checkUser);
            } else{
                res.status(400).json({ message: 'Incorrect email or password' });
            }
        } else{
            res.status(400).json({ message: 'Incorrect email or password' });
        }
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
});

module.exports = router;