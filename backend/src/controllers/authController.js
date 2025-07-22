const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

module.exports = {
    register
}