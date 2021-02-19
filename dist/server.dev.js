"use strict";

//environment variable
require('dotenv').config();

var express = require('express');

var app = express();

var cors = require('cors');

var bodyParser = require('body-parser'); //accept json


app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
})); //enable cors

app.use(cors()); //static files

app.use('/uploads', express["static"]('uploads')); //database connection

var DatabaseConnection = require('./config/mongodb');

DatabaseConnection(); //post

var Post = require('./routes/post');

app.use('/post', Post); //user

var User = require('./routes/user');

app.use('/user', User);
app.listen(process.env.PORT, function () {
  return console.log('server is running on ', process.env.PORT);
});