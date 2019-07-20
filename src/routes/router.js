var express = require('express');

function factory({db}) {
  var router = express.Router();

  var upload = require('./upload');
  var error = require('./error');
  var data = require('./data');

  router.use(upload({db}));
  router.use(data({db}));

// Must be last
  router.use(error);
  return router;
}


module.exports = factory;
