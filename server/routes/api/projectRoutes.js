const router = require('express').Router();
const { createProject, getProject } = require('../../controllers/projectControllers');

router.route('/').post(createProject);
router.route('/:projectId').get(getProject);

module.exports = router;