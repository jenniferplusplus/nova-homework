var express = require('express');
var router = express.Router();

// Global error handler
router.use(_404);
router.use('/', _404);
router.use(_500)

module.exports = router;

function _404 (req, res, next) {
    return res.status(404).end()
}

function _500 (err, req, res, next) {
    return res.json(err);
}
