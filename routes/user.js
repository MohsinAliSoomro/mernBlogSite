const router = require('express').Router();
const { auth } = require('../auth/auth');
const { user } = require('../controllers/user');
const { upload } = require('../multer/multer');
router.post('/signup',upload.single('avatar'), user.createUser);
router.get('/user', user.listUser);
router.post('/login', user.loginUser);
router.get('/user/:id', user.findUser);
router.post('/update/:id', upload.single('avatar'), user.updateUser);
router.delete('/delete/:id', user.deleteUser);
// router.post('/password/:id', auth.authenticateToken, user.passwordChangeUser);

module.exports = router;
