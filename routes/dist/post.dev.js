"use strict";

var router = require('express').Router();

var _require = require('../auth/auth'),
    auth = _require.auth;

var _require2 = require('../controllers/post'),
    post = _require2.post;

var _require3 = require('../multer/multer'),
    upload = _require3.upload;

router.post('/create', auth.authenticateToken, upload.single('avatar'), post.createPost);
router.get('/posts', post.listPost);
router.get('/post/:id', post.Post);
router.post('/update/:id', auth.authenticateToken, upload.single('avatar'), post.updatePost);
router.post('/delete/:id', auth.authenticateToken, post.deletePost);
module.exports = router;