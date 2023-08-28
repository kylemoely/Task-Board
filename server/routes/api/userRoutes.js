const router = require('express').Router();
const { signUp, getUserData } = require('../../controllers/userControllers');

router.route('/signup').post(signUp);

router.route('/:userId').get(getUserData);

module.exports = router;