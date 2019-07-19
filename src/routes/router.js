var express = require('express');
var router = express.Router();

var upload = require('./upload');
var error = require('./error');
var data = require('./data');

router.use(upload);
router.use(data);

// Must be last
router.use(error);


module.exports = router;
