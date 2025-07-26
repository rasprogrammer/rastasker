const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Team = require('@/models/Team');
const User = require('@/models/User');
const UserPassword = require('@/models/UserPassword');
const { validateMemberInput, addMemberValidation, editMemberValidation } = require('@/validations/memberValidation');
const { successResponse, errorResponse } = require('@/helpers/responseHelper');

const getAllMembers = async (req, res) => {
    try {
        const members = await User.find();
        return successResponse(res, 200, 'Members fetched successfully', members);
    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch members', error.message);
    }
};

const getMembers = async (req, res) => {
    try {
        const members = await User.find({ parentuserid: req.user._id });
        return successResponse(res, 200, 'Members fetched successfully', members);
    } catch (error) {
        return errorResponse(res, 500, 'Failed to fetch members', error.message);
    }
}

const verifyEmailExist = async (req, res, { email }) => {
    // check email already exist or not 
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(409).json({
            success: false,
            message: 'Email already exist',
            result: null,
            error: null,
            errorMessage: null,
        });
        return true;
    }
    return false;

};

const addMember = async (req, res) => {
    const { name, email, password, phone, team } = req.body;

    const { error } = addMemberValidation.validate({ name, email, password, phone, team });
    if (error) {
        return errorResponse(res, 409, error.message, error);
    }

    const emailExists = await verifyEmailExist(req, res, { email });
    if (emailExists) return;

    // register new user 
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        await session.startTransaction();

        const newUser = await User.create([{
            name: name,
            email: email,
            phone: phone,
            role: 'member',
            parentuserid: req.user._id,
            team: team,
            removed: false,
            enabled: true,
        }], { session });

        const salt = await bcrypt.genSalt(10);
        const userPasswordInstance = new UserPassword();
        const hashedPassword = userPasswordInstance.generateHash(salt, password);

        const newUserPassword = await UserPassword.create([{
            user: newUser[0]._id,
            password: hashedPassword,
            salt: salt
        }], { session });

        const teamData = await Team.updateOne(
            { _id: team },
            {
                $push: {
                    members: {
                        user: newUser[0]._id,
                        role: 'member',
                        joinedAt: new Date(),
                    }
                }
            },
            { session }
        );

        await session.commitTransaction();
        transactionCommitted = true;
        session.endSession();

        return successResponse(res, 201, 'Member created successfully', {
            id: newUser[0]._id,
            name: newUser[0].name,
            email: newUser[0].email,
        });
    } catch (error) {
        if (!transactionCommitted)
            session.abortTransaction();
        session.endSession();

        return errorResponse(res, 500, 'Member creation failed', error.message);
    }
};

const editMember = async (req, res) => {
    const memberId = req.params.id;
    if (!memberId) {
        return errorResponse(res, 409, 'Member id not found');
    }

    const { name, phone, team } = req.body;

    const { error } = editMemberValidation.validate({ name, phone, team });
    if (error) return errorResponse(res, 409, error.message, error);

    try {
        const member = await User.findById(memberId);
        if (!member) return errorResponse(res, 409, 'Member not found');

        // update member data
        const updatedMember = await User.updateOne({ _id: memberId }, {
            $set: {
                name: name,
                phone: phone,
            }
        });

        return successResponse(res, 200, 'Member updated successfully', {
            id: memberId,
            name: name,
            phone: phone,
            team: team || member.team,
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to update member', error.message);
    }
};

const deleteMember = async (req, res) => {
    const memberId = req.params.id;
    if (!memberId) return errorResponse(res, 409, 'Member id is required');

    try {
        const member = await User.findById(memberId);
        if (!member || member.parentuserid != req.user._id) {
            return errorResponse(res, 409, 'Member not found or unauthorized access');
        }

        // delete member data
        const deleteMember = await User.deleteOne({ _id: memberId });

        return successResponse(res, 200, 'Member deleted successfully', {
            id: memberId,
            name: member.name,
            email: member.email,
        });
    } catch (error) {
        return errorResponse(res, 500, 'Failed to delete member', error.message);
    }
};

module.exports = {
    getAllMembers,
    getMembers,
    addMember,
    editMember,
    deleteMember,
}