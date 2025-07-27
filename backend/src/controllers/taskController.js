const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const Task = require("@/models/Task");
const { addTaskValidation, editTaskValidation } = require("@/validations/taskValidation");
const { successResponse, errorResponse } = require("@/helpers/responseHelper");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return successResponse(res, 200, 'Tasks fetched successfully', tasks);
    } catch (error) {
        return errorResponse(res, 500, "Failed to get tasks", error.message);
    }
}

const getTasks = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            const tasks = await Task.find({ assignedTo: req.user.id });
            return successResponse(res, 200, 'Tasks fetched successfully', tasks);
        } else {
            const tasks = await Task.find({ owner: req.user.id });
            return successResponse(res, 200, 'Tasks fetched successfully', tasks);
        }
    } catch (error) {
        return errorResponse(res, 500, "Failed to get tasks", error.message);
    }
}

const addTask = async (req, res) => {
    try {
        const { error } = addTaskValidation.validate(req.body);
        if (error) {
            return errorResponse(res, 400, "Invalid task data", error.details[0].message);
        }
        const { title, description, taskType, files, assignedTo } = req.body;
        const taskId = uuidv4(4);
        const task = await Task.create({ taskId, title, description, taskType, files, owner: req.user._id, assignedTo });
        return successResponse(res, 201, "Task created successfully", task);
    } catch (error) {
        return errorResponse(res, 500, "Failed to create task", error.message);
    }
}

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return errorResponse(res, 400, "Task ID is required");
        }
        const { error } = editTaskValidation.validate(req.body);
        if (error) {
            return errorResponse(res, 400, "Invalid task data", error.details[0].message);
        }
        const { title, description, taskType, files, assignedTo } = req.body;
        const taskExists = await Task.findById(id);
        if (!taskExists) {
            return errorResponse(res, 404, "Task not found");
        }
        const task = await Task.findByIdAndUpdate(id, {
            title: title || taskExists.title,
            description: description || taskExists.description,
            taskType: taskType || taskExists.taskType,
            files: files || taskExists.files,
            assignedTo: assignedTo || taskExists.assignedTo
        }, { new: true });
        return successResponse(res, 200, "Task updated successfully", task);
    } catch (error) {
        return errorResponse(res, 500, "Failed to update task", error.message);
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return errorResponse(res, 400, "Task ID is required");
        }
        const taskExists = await Task.findById(id);
        if (!taskExists) {
            return errorResponse(res, 404, "Task not found");
        }
        await Task.findByIdAndDelete(id);
        return successResponse(res, 200, "Task deleted successfully");
    } catch (error) {
        return errorResponse(res, 500, "Failed to delete task", error.message);
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return errorResponse(res, 400, "Task ID is required");
        }

        const filter = req.user.role === 'admin' ? { _id: id, owner: req.user._id } : { _id: id, assignedTo: req.user._id };
        const task = await Task.findById(id, filter);
        if (!task) {
            return errorResponse(res, 404, "Task not found");
        }
        return successResponse(res, 200, "Task fetched successfully", task);
    } catch (error) {
        return errorResponse(res, 500, "Failed to get task", error.message);
    }
}


module.exports = {
    addTask,
    getTasks,
    editTask,
    deleteTask,
    getTask,
    getAllTasks,
};