const Joi = require('joi');

const addTeamValidation = Joi.object({
    name: Joi.string().required().trim(),
});

const editTeamValidation = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().trim(),
});

module.exports = {
    addTeamValidation,
    editTeamValidation,
};
