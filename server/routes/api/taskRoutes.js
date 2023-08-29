const router = require('express').Router();
const { createTask, getTask } = require('../../controllers/taskControllers');

router.route('/').post(createTask);
router.route('/:taskId').get(getTask);

module.exports = router;