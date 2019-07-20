var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('nova-homework:server');

var db = require('./models');

db.sequelize
  .authenticate()
  .then(() => {
    debug('Connected to the database.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
    process.exit(1);
  });

var router = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add routes
app.use(router({db}));

module.exports = app;
