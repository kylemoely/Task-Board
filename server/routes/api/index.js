const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authenticate = require('../../controllers/auth/authenticate');
const taskRoutes = require('../api/taskRoutes');
const projectRoutes = require('../api/projectRoutes');

router.use('/users', userRoutes);

router.use(authenticate);

router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);

module.exports = router;