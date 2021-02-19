"use strict";

var multer = require('multer');

var DIR = './uploads/';
var Storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, DIR);
  },
  filename: function filename(req, file, cb) {
    var fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, fileName);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});