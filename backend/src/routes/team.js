const express = require('express');
const router = express.Router();

const teamController = require('@/controllers/teamController');

router.route('/all').get(teamController.getAllTeam);

router.route('/').get(teamController.getTeams);

router.route('/').post(teamController.addTeam);

router.route('/:id').put(teamController.editTeam);

router.route('/:id').delete(teamController.deleteTeam);

module.exports = router;