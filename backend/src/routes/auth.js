const express = require('express');
const router = express.Router();

router.route('/register').post((req, res) => {
    res.status(200).json({
        success: true,
        message: 'Registering data'
    });
});

module.exports = router;