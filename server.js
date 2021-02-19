//environment variable
require('dotenv').config();
const express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
//accept json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
//enable cors
app.use(cors());

//static files
app.use('/uploads', express.static('uploads'));

//database connection
const DatabaseConnection = require('./config/mongodb');
DatabaseConnection();

//post
const Post = require('./routes/post');
app.use('/post', Post);
//user
const User = require('./routes/user');
app.use('/user', User);

app.listen(process.env.PORT, () => console.log('server is running on ', process.env.PORT));
