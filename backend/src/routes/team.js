const express = require('express');
const router = express.Router();

const teamController = require('@/controllers/teamController');

router.route('/').get(teamController.getAllTeam);

router.route('/').post(teamController.addTeam);

router.route('/').put(teamController.editTeam);

router.route('/').delete(teamController.deleteTeam);

module.exports = router;