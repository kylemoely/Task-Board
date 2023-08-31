const router = require('express').Router();
const { createTask, getTask, updateTask, deleteTask } = require('../../controllers/taskControllers');

router.route('/').post(createTask);
router.route('/:taskId').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;