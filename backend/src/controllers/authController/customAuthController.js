const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("@/models/User");
const UserPassword = require("@/models/UserPassword");

const { registerSchema, loginSchema } = require('@/validations/authValidation');
const { successResponse, errorResponse } = require('@/helpers/responseHelper');

const register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    const { error } = registerSchema.validate({ name, email, password, phone });

    if (error) {
        return errorResponse(res, 409, error.details[0].message);
    }

    const session = await mongoose.startSession();
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return errorResponse(res, 409, 'Email already exist');

        session.startTransaction();

        const [newUser] = await User.create([{
            name,
            email,
            phone,
            removed: false,
            enabled: true,
        }], { session });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(salt + password, 10);

        await UserPassword.create([{
            user: newUser._id,
            password: hashedPassword,
            salt
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, 201, 'User created successfully', {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        if (session?.inTransaction()) await session.abortTransaction();
        session?.endSession();
        return errorResponse(res, 500, 'User creation failed', error.message);
    }

};

const login = async (req, res) => {
    const { email, password, remember } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) return errorResponse(res, 409, error.details[0].message);

    try {
        const user = await User.findOne({ email, removed: false });
        if (!user) return errorResponse(res, 404, 'Email not registered');
        if (!user.enabled) return errorResponse(res, 403, 'Account disabled');

        const dbPass = await UserPassword.findOne({ user: user._id, removed: false });
        const isMatch = bcrypt.compareSync(dbPass.salt + password, dbPass.password);

        if (!isMatch) return errorResponse(res, 403, 'Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: remember ? '8760h' : '24h'
        });

        await UserPassword.updateOne({ user: user._id }, { $push: { loggedSessions: token } });

        return successResponse(res, 200, 'Successfully logged in', {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            maxAge: remember ? 365 : null,
        });
    } catch (err) {
        return errorResponse(res, 500, 'Login failed', err.message);
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return errorResponse(res, 401, 'Access Denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 1. Check if user still exists
        const user = await User.findOne({ _id: decoded.id, removed: false });
        if (!user) {
            return res.status(401).json({ message: 'Access Denied. User does not exist.' });
        }

        if (!user.googleId) {
            const userPassword = await UserPassword.findOne({ user: user._id });
            const update = token
                ? { $pull: { loggedSessions: token } }
                : { $set: { loggedSessions: [] } };

            await UserPassword.updateOne({ user: user._id }, update);
            return successResponse(res, 200, 'Successfully logged out');
        }
        return successResponse(res, 200, 'Successfully logged out');
    } catch (err) {
        return errorResponse(res, 500, 'Logout failed', err.message);
    }
};

const userData = async (req, res) => {
    const token = req.body.token || req.headers.authorization?.split(' ')[1];
    if (!token) return errorResponse(res, 401, 'Access Denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password -__v');
        if (!user) return errorResponse(res, 404, 'User not found');

        return successResponse(res, 200, 'User data retrieved successfully', user);
    } catch (err) {
        return errorResponse(res, 500, 'Failed to retrieve user data', err.message);
    }
}

module.exports = {
    register,
    login,
    logout,
    userData
}