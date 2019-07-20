var express = require('express');

module.exports = factory;

function factory({db}) {
  var router = express.Router();

  router.get('/data/:id', get);

  function get(req, res, next) {
    return db.models.Upload
      .findOne({
        where: {
          id: req.params['id']
        }
      })
      .then((result) => {
        return res.json(result.dataValues);
      })
      .catch((err) => {
        return next(err);
      });
  }

  return router;
}

