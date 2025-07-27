const Team = require('@/models/Team');
const Joi = require('joi');
const { addTeamValidation, editTeamValidation } = require('@/validations/teamValidation');
const { errorResponse, successResponse } = require('@/helpers/responseHelper');

const verifyTeamNameExist = async (req, name) => {
    // check team name already exist or not
    const existingTeam = await Team.findOne({ name: name, owner: req.user._id });
    return existingTeam;
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ owner: req.user._id });
        return successResponse(res, 200, 'Teams fetched successfully', teams);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

const getAllTeam = async (req, res) => {
    try {
        const allTeam = await Team.find();
        return successResponse(res, 200, allTeam, 'Success');
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

const addTeam = async (req, res) => {
    const { name } = req.body;

    const { error } = addTeamValidation.validate({ name: name });
    if (error) {
        return errorResponse(res, 409, error.message);
    }

    try {
        const existingTeam = await verifyTeamNameExist(req, name);
        if (existingTeam) {
            return errorResponse(res, 409, 'Team name already exists');
        }

        const data = await Team.create({
            name: name,
            owner: req.user._id,
        });

        return successResponse(res, 201, data, 'Team created successfully');
    } catch (error) {
        return errorResponse(res, 409, error.message, error);
    }
};

const editTeam = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return errorResponse(res, 409, 'Team id is required');
    }
    const { name } = req.body;

    const { error } = editTeamValidation.validate({ name, id });
    if (error) {
        return errorResponse(res, 409, error.message, error);
    }

    try {
        const team = await Team.findOne({ _id: id });
        if (!team) {
            return errorResponse(res, 409, 'Team not found');
        }

        const existingTeam = await verifyTeamNameExist(req, name);
        if (existingTeam) {
            return errorResponse(res, 409, 'Team name already exists');
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
    } catch (error) {
        return errorResponse(res, 500, 'Failed to update team', error.message);
    }
};

const deleteTeam = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return errorResponse(res, 409, 'Id is required');
    }

    try {
        const team = await Team.findOne({ _id: id });
        if (!team) {
            return errorResponse(res, 409, 'Team not found');
        }

        if (team.owner.toString() !== req.user._id.toString()) {
            return errorResponse(res, 403, 'You are not authorized to delete this team');
        }

        const data = await Team.deleteOne({ _id: id });
        return successResponse(res, 200, data, 'Team delete successfully');
    } catch (error) {
        return errorResponse(res, 500, 'Failed to delete team', error.message);
    }
};

module.exports = {
    getTeams,
    getAllTeam,
    addTeam,
    editTeam,
    deleteTeam,
}