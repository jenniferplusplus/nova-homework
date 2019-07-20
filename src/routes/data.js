var express = require('express');

module.exports = factory;

function factory({db}) {
    var router = express.Router();

    router.get('/data/:id', get);

    function get(req, res, next) {
        return Promise
          .resolve()
          .then(() => {
              return res.json({
                  id: req.params['id']
              });
          });
    }

    return router;
}

