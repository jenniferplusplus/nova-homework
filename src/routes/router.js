var express = require('express');
var router = express.Router();
var db = require('../models');

var upload = require('./upload');
var error = require('./error');
var data = require('./data');

router.use(upload(db));
router.use(data(db));

// Must be last
router.use(error);


module.exports = router;
