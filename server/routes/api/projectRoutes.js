const router = require('express').Router();
const { createProject, getProject, updateProject, deleteProject, inviteUserToProject } = require('../../controllers/projectControllers');

router.route('/').post(createProject);
router.route('/:projectId').get(getProject).put(updateProject).delete(deleteProject);
router.route('/:projectId/add').put(inviteUserToProject);

module.exports = router;