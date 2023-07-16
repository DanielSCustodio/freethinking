const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { checkAuth } = require('../helpers/auth');

router.get('/add', checkAuth, PostController.createPost);
router.get('/dashboard', checkAuth, PostController.dashboard);
router.get('/', checkAuth, PostController.showPosts);
router.post('/add', checkAuth, PostController.createPostSave);

module.exports = router;
