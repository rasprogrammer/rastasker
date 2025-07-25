const Team = require('@/models/Team');
const Joi = require('joi');

const getAllTeam = async (req, res) => {
    const allTeam = await Team.find();

    return res.status(200).json({
        success: true,
        result: allTeam,
        message: 'Success',
    });
};

const addTeam = async (req, res) => {
    const { name } = req.body;

    const validateSchema = Joi.object({
        name: Joi.string().required().trim(),
    });

    const { error } = validateSchema.validate({
        name: name
    });

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            message: error.message,
            error: error,
            errorMessage: error.message,
        });
    }

    const team = await Team.findOne({ name: name });
    if (team) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Team name already exists',
        });
    }

    try {
        const data = await Team.create({
            name: name,
            owner: req.user._id,
        });

        return res.status(201).json({
            success: true,
            result: data,
            message: 'Team created successfully',
        });
    } catch (error) {
        return res.status(409).json({
            success: false,
            result: null,
            message: error.message,
            error: error,
            errorMessage: error.message,
        });
    }
};

const editTeam = async (req, res) => {
    const { name, id } = req.body;

    const validateSchema = Joi.object({
        name: Joi.string().required(),
        id: Joi.string().required(),
    });

    const { error } = validateSchema.validate({
        name: name,
        id: id,
    });

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            message: error.message,
            error: error,
            errorMessage: error.message,
        });
    }

    const team = await Team.findOne({ _id: id });
    if (!team) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Team not found',
        });
    }

    const checkTeam = await Team.findOne({ name: name });
    if (checkTeam) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Team name already exist',
        });
    }

    const data = await Team.updateOne(
        { _id: team.id },
        { $set: { name: name } }
    );

    return res.status(200).json({
        success: true,
        result: data,
        message: 'Team update successfully',
    });

};

const deleteTeam = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Id not found',
        });
    }

    const team = await Team.findOne({ _id: id });
    if (!team) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Team not found',
        });
    }

    const data = await Team.deleteOne({ _id: id });

    return res.status(200).json({
        success: true,
        result: data,
        message: 'Team delete successfully',
    });


};

module.exports = {
    getAllTeam,
    addTeam,
    editTeam,
    deleteTeam,
}