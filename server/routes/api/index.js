const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authenticate = require('../../controllers/auth/authenticate');
// const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);

router.use(authenticate);
// router.use('/projects', thoughtRoutes);

module.exports = router;