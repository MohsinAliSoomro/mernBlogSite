const router = require('express').Router();
const { auth } = require('../auth/auth');
const { user } = require('../controllers/user');
const { upload } = require('../multer/multer');
router.post('/signup',upload.single('avatar'), user.createUser);
router.get('/user', user.listUser);
router.post('/login', user.loginUser);
router.get('/user/:id',auth.authenticateToken, user.findUser);
router.post('/update/:id',auth.authenticateToken, upload.single('avatar'), user.updateUser);
router.delete('/delete/:id',auth.authenticateToken, user.deleteUser);

module.exports = router;
