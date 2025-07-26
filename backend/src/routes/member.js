const express = require('express');
const router = express.Router();

const memberController = require('@/controllers/memberController');

router.route('/all').get(memberController.getAllMembers);

router.route('/').get(memberController.getMembers);

router.route('/').post(memberController.addMember);

router.route('/:id').put(memberController.editMember);

router.route('/:id').delete(memberController.deleteMember);

module.exports = router;