"use strict";

var router = require('express').Router();

var _require = require('../auth/auth'),
    auth = _require.auth;

var _require2 = require('../controllers/user'),
    user = _require2.user;

var _require3 = require('../multer/multer'),
    upload = _require3.upload;

router.post('/signup', upload.single('avatar'), user.createUser);
router.get('/user', user.listUser);
router.post('/login', user.loginUser);
router.get('/user/:id', auth.authenticateToken, user.findUser);
router.post('/update/:id', auth.authenticateToken, upload.single('avatar'), user.updateUser);
router["delete"]('/delete/:id', auth.authenticateToken, user.deleteUser);
module.exports = router;