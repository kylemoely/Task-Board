const router = require('express').Router();
const apiRoutes = require('./api');
const { login, logout } = require('../controllers/userControllers')
const refresh = require('../controllers/auth/refresh');

router.use('/api', apiRoutes);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/refresh').get(refresh);

module.exports = router;