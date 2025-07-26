const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const Task = require("@/models/Task");

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    taskType: Joi.string().required(),
    files: Joi.array().items(Joi.string()),
});

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ 
            success: true,
            result: tasks,
            message: "Tasks fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to get tasks",
            error: error.message,
        });
    }
}

const addTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                message: error.details[0].message,
            });
        }
        const { title, description, taskType, files } = req.body;
        const taskId = uuidv4();
        const task = await Task.create({ taskId, title, description, taskType, files });
        res.status(201).json({ 
            success: true,
            result: task,
            message: "Task created successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to create task",
            error: error.message,
        });
    }
}

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                message: error.details[0].message,
            });
        }
        const { title, description, taskType, files } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, description, taskType, files });
        res.status(200).json({ 
            success: true,
            result: task,
            message: "Task updated successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to delete task",
            error: error.message,
        });
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found",
            });
        }
        res.status(200).json({ 
            success: true,
            result: task,
            message: "Task fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to get task",
            error: error.message,
        });
    }
}


module.exports = {
    addTask,
    getTasks,
    editTask,
    deleteTask,
    getTask,
};