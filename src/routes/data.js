var express = require('express');
var router = express.Router();

router.get('/data/:id', get);

module.exports = router;

function get(req, res, next){
    return res.json({
        id: req.params['id']
    });
}
