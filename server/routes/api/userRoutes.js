const router = require('express').Router();
const { signUp, getUserData } = require('../../controllers/userControllers');
const authenticate = require('../../controllers/auth/authenticate');

router.route('/signup').post(signUp);
router.use(authenticate);
router.route('/').get(getUserData);

module.exports = router;