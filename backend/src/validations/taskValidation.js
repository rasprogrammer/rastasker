const Joi = require("joi");
const taskTypes = require("@/helpers/taskTypes");

const addTaskValidation = Joi.object({
    description: Joi.string().required(),
    title: Joi.string().required(),
    taskType: Joi.string().valid(...Object.values(taskTypes)).required(),
    files: Joi.array().items(Joi.string().uri()).optional(),
    assignedTo: Joi.string(),
});
const editTaskValidation = Joi.object({
    description: Joi.string().optional(),
    title: Joi.string().optional(),
    taskType: Joi.string().valid(...Object.values(taskTypes)).optional(),
    files: Joi.array().items(Joi.string().uri()).optional(),
    assignedTo: Joi.string(),
});

module.exports = {
    addTaskValidation,
    editTaskValidation,
};
