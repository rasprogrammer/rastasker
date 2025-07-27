const express = require('express');
const router = express.Router();

const protectRoute = require("@/middlewares/protectRoute");
const teamController = require('@/controllers/teamController');

router.route('/all').get(protectRoute(['admin']), teamController.getAllTeam);

router.route('/')
    .get(protectRoute(['admin']), teamController.getTeams)
    .post(protectRoute(['admin']), teamController.addTeam);

router.route('/:id')
    .put(protectRoute(['admin']), teamController.editTeam)
    .delete(protectRoute(['admin']), teamController.deleteTeam);

module.exports = router;