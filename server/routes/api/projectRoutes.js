const router = require('express').Router();
const { createProject, getProject, updateProject } = require('../../controllers/projectControllers');

router.route('/').post(createProject);
router.route('/:projectId').get(getProject).put(updateProject);

module.exports = router;