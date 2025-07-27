const express = require('express');
const router = express.Router();

const memberController = require('@/controllers/memberController');
const protectRoute = require("@/middlewares/protectRoute");

router.route('/all').get(protectRoute(['admin']), memberController.getAllMembers);

router.route('/').get(protectRoute(['admin']), memberController.getMembers);

router.route('/').post(protectRoute(['admin']), memberController.addMember);

router.route('/:id').put(protectRoute(['admin']), memberController.editMember);

router.route('/:id').delete(protectRoute(['admin']), memberController.deleteMember);

module.exports = router;