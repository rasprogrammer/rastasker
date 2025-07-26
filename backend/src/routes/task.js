const express = require("express");
const router = express.Router();
const taskController = require("@/controllers/taskController");

router.route('/').post(taskController.addTask).get(taskController.getTasks);
router.route('/:id').put(taskController.editTask).delete(taskController.deleteTask).get(taskController.getTask);

module.exports = router;