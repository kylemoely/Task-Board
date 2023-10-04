const router = require('express').Router();
const { createNotification, updateNotification, deleteNotification } = require('../../controllers/notificationControllers');

router.route('/').post(createNotification);
router.route('/:id').put(updateNotification).delete(deleteNotification);

module.exports = router;