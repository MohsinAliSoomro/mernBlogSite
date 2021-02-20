const router = require('express').Router();
const { auth } = require('../auth/auth');
const { post } = require('../controllers/post');
const { upload } = require('../multer/multer');

router.post('/create',auth.authenticateToken, upload.single('avatar'),  post.createPost);
router.get('/posts', post.listPost);
router.get('/post/:id', post.Post);
router.post('/update/:id',auth.authenticateToken, upload.single('avatar'), post.updatePost);
router.post('/delete/:id', auth.authenticateToken, post.deletePost);

module.exports = router;
