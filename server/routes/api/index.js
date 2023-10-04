const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authenticate = require('../../controllers/auth/authenticate');
const taskRoutes = require('../api/taskRoutes');
const projectRoutes = require('../api/projectRoutes');
const notificationRoutes = require('../api/notificationRoutes');

router.use('/users', userRoutes);

router.use(authenticate);

router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;