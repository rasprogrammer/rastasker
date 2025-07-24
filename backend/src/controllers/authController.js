const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("@/models/User");
const UserPassword = require("@/models/UserPassword");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const objectSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: true } }).required(),
        password: Joi.string().required(),
    });

    const { error } = objectSchema.validate({ name, email, password });

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            message: error.message,
            erorr: error,
            errorMessage: error.message
        });
    }

    // check email already exist or not 
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email already exist',
            result: null,
            error: null,
            errorMessage: null,
        });
    }

    // register new user 
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const newUser = await User.create([{
            name: name,
            email: email,
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

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            error: null,
            errorMessage: null,
            message: 'User created successfully',
            result: {
                id: newUser[0].id,
                name: newUser[0].name,
                email: newUser[0].email,
            }
        })
    } catch (error) {
        session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            success: false,
            result: null,
            message: 'user creatation failed',
            erorr: error,
            errorMessage: error.message,
        });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const objectSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = objectSchema.validate({ email, password });

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing Credentials.',
            errorMessage: error.message,
        });
    }

    const user = await User.findOne({ email: email, removed: false });
    if (!user) {
        return res.status(404).json({
            success: false,
            result: null,
            error: null,
            message: 'No account with this email has been registered.',
        });
    }

    if (!user.enabled) {
        return res.status(404).json({
            success: false,
            result: null,
            error: null,
            message: 'Your account is disabled, contact your account adminstrator',
        });
    }

    const databasePassword = await UserPassword.findOne({ user: user._id, removed: false });

    const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);
    if (isMatch === true) {
        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }
        );

        await UserPassword.findOneAndUpdate(
            { user: user._id },
            { $push: { loggedSessions: token } },
            {
                new: true,
            }
        ).exec();

        res.status(200).json({
            success: true,
            result: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                role: user.role,
                email: user.email,
                photo: user.photo,
                token: token,
                maxAge: req.body.remember ? 365 : null,
            },
            message: 'Successfully login user',
        });
    } else {
        return res.status(403).json({
            success: false,
            result: null,
            error: null,
            message: 'Invalid credentials.',
        });
    }


};

module.exports = {
    register,
    login
}