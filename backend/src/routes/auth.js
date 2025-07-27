const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { successResponse, errorResponse } = require('@/helpers/responseHelper');

const authController = require('@/controllers/authController');

router.route('/register').post(authController.register);


router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

// Google Oauth
router.route('/google').get(async (req, res) => {
    return res.send(`<a href='/api/auth/google/register'> Login with google</a>`);
});

router.route('/google/register').get(async (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);

});

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
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
  }
);

module.exports = router;