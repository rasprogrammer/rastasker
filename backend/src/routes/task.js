const express = require("express");
const router = express.Router();
const taskController = require("@/controllers/taskController");
const protectRoute = require("@/middlewares/protectRoute");

router.route('/all').get(protectRoute(['admin']), taskController.getAllTasks);
router.route('/').post(protectRoute(['admin']), taskController.addTask).get(taskController.getTasks);
router
    .route('/:id')
    .put(protectRoute(['admin']), taskController.editTask)
    .delete(protectRoute(['admin']), taskController.deleteTask)
    .get(taskController.getTask);

module.exports = router;