const customController = require('./customAuthController');
const googleController = require('./googleAuthController');

module.exports = { ...customController, ...googleController };