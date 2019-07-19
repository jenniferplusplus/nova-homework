var express = require('express');
var router = express.Router();

var index = require('./index');
var upload = require('./upload');
var error = require('./error');
var data = require('./data');

router.use(index);
router.use(upload);
router.use(error);
router.use(data);

module.exports = router;
