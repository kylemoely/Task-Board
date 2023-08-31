const router = require('express').Router();
const { createTask, getTask, updateTask } = require('../../controllers/taskControllers');

router.route('/').post(createTask);
router.route('/:taskId').get(getTask).put(updateTask);

module.exports = router;