const router = require('express').Router();
const { createProject, getProject, updateProject, deleteProject } = require('../../controllers/projectControllers');

router.route('/').post(createProject);
router.route('/:projectId').get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;