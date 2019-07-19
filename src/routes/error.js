var express = require('express');
var router = express.Router();

// Global error handler
router.use(function (req, res, next, err) {
    res.end(err);
});

module.exports = router;
