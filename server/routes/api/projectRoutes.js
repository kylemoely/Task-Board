const router = require('express').Router();
const { createProject, getProject, updateProject, deleteProject, inviteUserToProject, userAnswersInvite } = require('../../controllers/projectControllers');

router.route('/').post(createProject);
router.route('/:projectId').get(getProject).put(updateProject).delete(deleteProject);
router.route('/:projectId/add').put(inviteUserToProject);
router.route('/:projectId/:answer').put(userAnswersInvite);

module.exports = router;