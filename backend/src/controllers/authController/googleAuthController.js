const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { successResponse, errorResponse } = require('@/helpers/responseHelper');

const google = async (req, res) => {
    return res.send(`<a href='/api/auth/google/register'> Login with google</a>`);
};

const googleRegister = async (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);

};
const googleCallback = async (req, res) => {
    passport.authenticate('google', { session: false, failureRedirect: '/login' })(req, res, async () => {
        req.user = req.user || req.newUser;
        console.log('Google callback:', req.user);
        // JWT token issue
        const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        return successResponse(res, 200, 'Login successful', {
            user: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                photo: req.user.photo
            },
            token
        });
    });
};

module.exports = {
    google,
    googleRegister,
    googleCallback
};