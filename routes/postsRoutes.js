const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, PostController.createPost);
router.get('/dashboard', checkAuth, PostController.dashboard);
router.get('/', PostController.showPosts);

module.exports = router;
