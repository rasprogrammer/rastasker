const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.end('<h2> Team </h2>');
});

module.exports = router;