const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Team = require('@/models/Team');
const User = require('@/models/User');
const UserPassword = require('@/models/UserPassword');
const { validateMemberInput } = require('@/validations/memberValidation');

const getAllMembers = async (req, res) => {
    const members = await User.find();

    return res.status(200).json({
        success: true,
        result: members,
        message: 'success',
    })
}

const getMembers = async (req, res) => {
    const members = await User.find({ parentuserid: req.user._id });

    return res.status(200).json({
        success: true,
        result: members,
        message: 'success',
    })
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

    const validateMember = validateMemberInput(req, res, { name, email, password, phone, team });
    if (validateMember) return;

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

        return res.status(201).json({
            success: true,
            error: null,
            errorMessage: null,
            message: 'Member created successfully',
            result: {
                id: newUser[0].id,
                name: newUser[0].name,
                email: newUser[0].email,
            }
        })
    } catch (error) {
        if (!transactionCommitted)
            session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            success: false,
            result: null,
            message: 'Member creatation failed',
            erorr: error,
            errorMessage: error.message,
        });
    }
};

const editMember = async (req, res) => {
    const memberId = req.params.id;
    if (!memberId) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Member id not found',
        });
    }

    const { name, phone, team } = req.body;

    const validateMember = validateMemberInput(req, res, { name, phone, team }, true);
    if (validateMember) return;

    try {

        const member = await User.findById(memberId);
        if (!member) {
            return res.status(409).json({
                success: false,
                result: null,
                message: 'Member not found',
            });
        }

        // update member data
        const updatedMember = await User.updateOne({ _id: memberId }, {
            $set: {
                name: name,
                phone: phone,
            }
        });

        return res.status(200).json({
            success: true,
            result: updatedMember,
            message: 'Member update successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            erorr: error,
            errorMessage: error.message,
        });
    }
};

const deleteMember = async (req, res) => {
    const memberId = req.params.id;
    if (!memberId) {
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Member id not found',
        });
    }

    try {

        const member = await User.findById(memberId);
        if (!member || member.parentuserid != req.user._id) {
            return res.status(409).json({
                success: false,
                result: null,
                message: 'Member not found',
            });
        }

        // delete member data
        const deleteMember = await User.deleteOne({ _id: memberId });

        return res.status(200).json({
            success: true,
            result: deleteMember,
            message: 'Member delete successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            erorr: error,
            errorMessage: error.message,
        });
    }

};

module.exports = {
    getAllMembers,
    getMembers,
    addMember,
    editMember,
    deleteMember,
}