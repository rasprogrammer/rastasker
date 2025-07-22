const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRound = 10;

const userPasswordSchema = new mongoose.Schema(
    {
        removed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        emailToken: String,
        resetToken: String,
        emailVerified: {
            type: Boolean,
            default: false,
        },
        authType: {
            type: String,
            default: 'email',
        },
        loggedSessions: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true
    }
);

userPasswordSchema.methods.generateHash = function (salt, password) {
    return bcrypt.hashSync(salt + password, saltRound);
};

userPasswordSchema.methods.validPassword = function (salt, userPassword) {
    return bcrypt.compareSync(salt + userPassword, this.password);
};

module.exports = mongoose.model('UserPassword', userPasswordSchema);