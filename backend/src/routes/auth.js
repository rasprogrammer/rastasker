const express = require('express');
const router = express.Router();

const authController = require('@/controllers/authController');

router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

// Google Oauth
router.route('/google').get(authController.google);

router.route('/google/register').get(authController.googleRegister);

router.route('/google/callback').get(authController.googleCallback);

module.exports = router;