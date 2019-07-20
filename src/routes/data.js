var express = require('express');

module.exports = factory;

function factory({db}) {
  var router = express.Router();

  router.get('/data/:id', get);

  function get(req, res, next) {
    return db.Upload
      .findOne({
        where: {
          id: req.params['id']
        },
        include: [{model: db.Keyword}]
      })
      .then((result) => {
        if(result === null) return res.status(404).end();
        return res.json(result.dataValues);
      })
      .catch((err) => {
        return next(err);
      });
  }

  return router;
}

