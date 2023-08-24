const router = require('express').Router();
const { signUp } = require('../../controllers/userControllers');

router.route('/signup').post(signUp);

module.exports = router;