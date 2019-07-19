var express = require('express');
var router = express.Router();

router.post('/phase1', phaseOne);
router.post('/phase2', phaseTwo);

module.exports = router;

function phaseOne(req, res, next) {

}

function phaseTwo(req, res, next) {

}

