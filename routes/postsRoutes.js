const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { checkAuth } = require('../helpers/auth');

router.get('/dashboard', checkAuth, PostController.dashboard);
router.post('/add', checkAuth, PostController.createPostSave);
router.post('/remove', checkAuth, PostController.removePost);
router.get('/', checkAuth, PostController.showPosts);

module.exports = router;
