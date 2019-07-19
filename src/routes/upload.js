var express = require('express');

module.exports = factory;

function factory({db}) {
    var router = express.Router();

    router.post('/phase1', phaseOne);
    router.post('/phase2', phaseTwo);


    function phaseOne(req, res, next) {

    }

    function phaseTwo(req, res, next) {

    }

    return router
}
