var express = require('express');
const fileMiddleware = require('express-fileupload');
const path = require('path');

module.exports = factory;

function factory({db}) {
  var router = express.Router();

  router.post('/phase1', phaseOne);
  router.put('/phase2', fileMiddleware(), phaseTwo);


  function phaseOne(req, res, next) {
    return db.Upload
      .create({
          description: req.body.description,
          extension: req.body.extension,
          Keywords: req.body.keywords.map((v) => {
            return {keyword: v}
          })
        },
        {
          include: db.Keyword
        })
      .then((res) => {
        return res;
      })
      .then((upload) => {
        return res.json({
          id: upload.id
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  function phaseTwo(req, res, next) {
    const file = req.files.phaseTwo;

    return db.Upload
      .findOne({
        where: {id: req.body.id}
      })
      .then((upload) => {
        const ext = path.extname(file.name).toLowerCase();
        const regex = new RegExp(`\.?${upload.extension.toLowerCase()}`);
        if (!regex.test(ext)) {
          res.status(409);
          return {
            error: 'Incorrect file type',
            message: `The required type for this file is {${upload.extension}} but the uploaded file had type {${ext}}`
          }
        }

        upload.md5 = file.md5;
        upload.size = file.size;
        return upload.save()
          .then((result) => result.id);
      })
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return next(err);
      });
  }

  return router
}
